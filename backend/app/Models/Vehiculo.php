<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;
    protected $table="vehiculo";
    protected $fillable=[
        "placa",
        "creadoPor",
        "fechaCreacion",
        "Tipo_Id"
    ];

    public function Estancia(){
        return $this->belongsTo(Estancia::class);
    }
    public function Tipo(){
        return $this->belongsTo(Tipo::class);
    }
}
