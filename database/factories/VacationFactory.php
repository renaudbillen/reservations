<?php

namespace Database\Factories;

use App\Models\Vacation;
use Illuminate\Database\Eloquent\Factories\Factory;

class VacationFactory extends Factory
{
    protected $model = Vacation::class;

    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 year', '+1 year');
        $endDate = fake()->dateTimeBetween(
            $startDate,
            $startDate->format('Y-m-d') . ' +1 year'
        );

        return [
            'name' => fake()->name(),
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }
}
