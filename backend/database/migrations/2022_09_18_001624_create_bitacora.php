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
        Schema::create('bitacora', function (Blueprint $table) {
            $table->id();
            $table->string('placa',15);
            $table->string('concepto',250)->nullable();
            $table->timestamp('fechaInicio')->nullable();
            $table->timestamp('fechaFin')->nullable();
            $table->decimal('importe',10,2)->default(0);
            $table->string('creadoPor',250);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bitacora');
    }
};
