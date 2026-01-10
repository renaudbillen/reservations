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
            'day_of_week' => ['required', 'integer', 'min:0', 'max:6'], // 0-6 for Sunday-Saturday
            'period' => ['required', 'string', Rule::in(['AM', 'PM'])],
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
            'period.in' => 'The selected period is invalid. Must be AM or PM.',
            'room_id.required' => 'Please select a room.',
            'room_id.exists' => 'The selected room is invalid.',
            'user_id.exists' => 'The selected user is invalid.',
            'description.max' => 'The description may not be greater than 500 characters.',
        ];
    }
    
    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->start_date && $this->end_date) {
                $startDate = Carbon::parse($this->start_date);
                $endDate = Carbon::parse($this->end_date);
                
                if ($endDate->diffInDays($startDate) > 180) {
                    $validator->errors()->add('end_date', 'The end date must be within 6 months of the start date.');
                }
            }
        });
    }
}
