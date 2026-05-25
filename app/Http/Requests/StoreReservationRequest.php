<?php

namespace App\Http\Requests;

use App\Models\Reservation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'reservation_date' => ['required', 'date', 'after_or_equal:today'],
            'start_time' => ['required', 'string', Rule::in(Reservation::TIME_SLOTS)],
            'end_time' => ['required', 'string', Rule::in(Reservation::TIME_SLOTS)],
            'room_id' => ['required', 'exists:rooms,id'],
            'for_user_id' => ['nullable', 'exists:users,id'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->start_time && $this->end_time) {
                $startIndex = array_search($this->start_time, Reservation::TIME_SLOTS);
                $endIndex = array_search($this->end_time, Reservation::TIME_SLOTS);

                if ($startIndex !== false && $endIndex !== false && $endIndex <= $startIndex) {
                    $validator->errors()->add('end_time', 'The end time must be after the start time.');
                }
            }
        });
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'reservation_date' => $this->reservation_date ?? now()->format('Y-m-d'),
        ]);
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'reservation_date.after_or_equal' => 'The reservation date must be today or in the future.',
            'start_time.in' => 'The selected start time slot is invalid.',
            'end_time.in' => 'The selected end time slot is invalid.',
        ];
    }
}
