<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReservationRequest extends FormRequest
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
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'reservation_date.after_or_equal' => 'The reservation date must be today or in the future.',
            'reservation_period.in' => 'The selected period is invalid. Must be AM or PM.',
            'end_time.after' => 'The end time must be a date after start time.',
        ];
    }
}
