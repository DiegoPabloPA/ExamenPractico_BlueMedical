<?php

namespace App\Http\Controllers;
use App\Models\Estancia;
use App\Models\Precio;
use Illuminate\Http\Request;

class EstanciaController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }

    public function ClearEstancia(){
        try{
        Estancia::join('vehiculo','vehiculo.placa','=','estancia.vehiculo_placa')
        ->join('tipo','tipo.id','=','vehiculo.Tipo_Id')->where('tipo.id','1')->delete();
        $result=$this->UpdateEstancia();
         return \response()->json(['res'=>true,'message'=>'Se ha iniciado un Nuevo mes con exito'],200);
        }catch(Exception $ex){
           return \response()->json(['res'=>false,'message'=>'ERROR Se presento el siguiente Problema: '.$ex->getMessage()],406);
        }
    }

    public function UpdateEstancia(){
        return Estancia::join('vehiculo','vehiculo.placa','=','estancia.vehiculo_placa')
        ->join('tipo','tipo.id','=','vehiculo.Tipo_Id')->where('tipo.id','3')->update([
            'fechaInicio'=>null,'fechaFin'=>null,'acumulado'=>0
        ]);
    }

    public function getEstanciaResidentes(){
        $precio=Precio::where('Tipo_Id','3')->select(['valor'])->first();
        if($precio){
            return Estancia::join('vehiculo','vehiculo.placa','=','estancia.vehiculo_placa')
            ->join('tipo','tipo.id','=','vehiculo.Tipo_Id')->where('tipo.id','3')->
            select('estancia.vehiculo_placa','estancia.acumulado',\DB::raw('estancia.acumulado*'.$precio->valor))->get();
       
        }else{
            return \response()->json(['res'=>true,'message'=>'ERROR: No se pudo realizar el calculo del total por estacionamiento'],406);
        }
    
    }
}
