<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo extends Model
{
    use HasFactory;
    protected $table="tipo";
    protected $fillable=[
        "id",
        "nombre"
    ];

    public function Vehiculo(){
        return $this->hasMany(Vehiculo::class);
    }
    public function Precio(){
        return $this->hasMany(Precio::class);
    }
}
