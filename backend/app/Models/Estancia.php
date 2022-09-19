<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estancia extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table="estancia";
    protected $fillable=[
        "id",
        "fechaInicio",
        "fechaFin",
        "acumulado",
        "vehiculo_placa"
    ];

    public function Vehiculo(){
        return $this->hasMany(Vehiculo::class);
    }
}
