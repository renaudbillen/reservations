<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('reservation_date')->nullable(false);
            $table->enum('reservation_period', ['AM', 'PM'])->nullable(false);
            $table->smallInteger('room_id')->nullable()->unsigned();
            $table->bigInteger('by_user_id')->nullable()->unsigned();
            $table->bigInteger('for_user_id')->nullable()->unsigned();

            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onDelete('set null');

            $table->foreign('by_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('for_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
