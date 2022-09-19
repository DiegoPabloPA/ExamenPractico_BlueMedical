<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get("getTipos",[\App\Http\Controllers\TipoController::class,'index']);
Route::post("nuevo/Vehiculo",[App\Http\Controllers\VehiculoController::class,'store']);
Route::post("nuevo/Ingreso",[App\Http\Controllers\BitacoraController::class,'store']);
Route::post("update/Ingreso",[App\Http\Controllers\BitacoraController::class,'update']);
Route::get("get/Bitacora",[App\Http\Controllers\BitacoraController::class,'index']);
Route::delete("delete/Estancia",[App\Http\Controllers\EstanciaController::class,'ClearEstancia']);
Route::get("get/Residentes/Pago",[App\Http\Controllers\EstanciaController::class,'getEstanciaResidentes']);
Route::post("login",[App\Http\Controllers\AuthController::class,'login']);
