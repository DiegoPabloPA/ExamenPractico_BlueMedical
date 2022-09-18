<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estancia', function (Blueprint $table) {
            $table->id();
            $table->timestamp('fechaInicio');
            $table ->timestamp('fechaFin');
            $table ->unsignedBigInteger('acumulado');
            $table ->string('vehiculo_placa',15);
            $table ->foreign('vehiculo_placa')
            ->references('placa')->on('vehiculo')
            ->onUpdate('cascade')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estancia');
    }
};
