<?php

namespace App\Http\Requests;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePeriodicReservationRequest extends FormRequest
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
            'room_id' => ['required', 'exists:rooms,id'],
            'day_of_week' => ['required', 'integer', 'min:0', 'max:6'],
            'start_time' => ['required', 'string', Rule::in(Reservation::TIME_SLOTS)],
            'end_time' => ['required', 'string', Rule::in(Reservation::TIME_SLOTS)],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
                function ($attribute, $value, $fail) {
                    $startDate = Carbon::parse($this->start_date);
                    $endDate = Carbon::parse($value);

                    if ($endDate->diffInMonths($startDate) > 6) {
                        $fail('The end date must be within 6 months of the start date.');
                    }
                },
            ],
            'user_id' => ['nullable', 'exists:users,id'],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Validate end_time is after start_time
            if ($this->start_time && $this->end_time) {
                $startIndex = array_search($this->start_time, Reservation::TIME_SLOTS);
                $endIndex = array_search($this->end_time, Reservation::TIME_SLOTS);

                if ($startIndex !== false && $endIndex !== false && $endIndex <= $startIndex) {
                    $validator->errors()->add('end_time', 'The end time must be after the start time.');
                }
            }

            // Validate date range
            if ($this->start_date && $this->end_date) {
                $startDate = Carbon::parse($this->start_date);
                $endDate = Carbon::parse($this->end_date);

                if ($endDate->diffInDays($startDate) > 180) {
                    $validator->errors()->add('end_date', 'The end date must be within 6 months of the start date.');
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
            'start_date' => $this->start_date ?? now()->format('Y-m-d'),
            'end_date' => $this->end_date ?? now()->addMonth()->format('Y-m-d'),
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
            'start_date.after_or_equal' => 'The start date must be today or in the future.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
            'day_of_week.*' => 'Please select a valid day of the week.',
            'start_time.in' => 'The selected start time slot is invalid.',
            'end_time.in' => 'The selected end time slot is invalid.',
            'room_id.required' => 'Please select a room.',
            'room_id.exists' => 'The selected room is invalid.',
            'user_id.exists' => 'The selected user is invalid.',
            'description.max' => 'The description may not be greater than 500 characters.',
        ];
    }
}
