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
            'reservation_period' => ['required', 'string', Rule::in(Reservation::PERIODS)],
            'room_id' => ['required', 'exists:rooms,id'],
            'for_user_id' => ['nullable', 'exists:users,id'],
        ];
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
            'reservation_period.in' => 'The selected period is invalid. Must be AM or PM.',
            'start_time.after_or_equal' => 'The start time must be a date after or equal to now.',
            'end_time.after' => 'The end time must be a date after start time.',
        ];
    }
}
