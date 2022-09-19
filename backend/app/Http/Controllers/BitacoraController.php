<?php

namespace App\Http\Controllers;
use App\Models\Vehiculo;
use App\Models\Estancia;
use App\Models\Bitacora;
use App\Models\Tipo;
use App\Models\Precio;
use Illuminate\Http\Request;

class BitacoraController extends Controller
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
        return Bitacora::leftJoin('vehiculo','vehiculo.placa','=','bitacora.placa')->
        leftJoin('tipo','tipo.id','=','vehiculo.Tipo_Id')->
        whereNull('bitacora.fechaFin')->
        select('bitacora.*','tipo.nombre')->get(); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
        $verify=Bitacora::select('placa')->where('placa','=',$request->placa)
        ->WhereNull('fechaFin')->first();

        if($verify){
            return \response()->json(['res'=>false,'message'=>'ERROR : La Placa posee un ingreso abierto'],406);
        }else{
            $res=Bitacora::create($request->all());
            $tipo=Vehiculo::select(['Tipo_Id'])
            ->where('placa','=',$request->placa)->first();
    
            if($tipo){
               switch($tipo->Tipo_Id){
                case 1:
                    Estancia::create([   
                            'vehiculo_placa'=>$request->placa,
                            'fechaInicio'=>$request->fechaInicio]
                );
                break;
                case 3:
                    Estancia::updateOrCreate(
                        ['vehiculo_placa'=>$request->placa],
                        [   'vehiculo_placa'=>$request->placa,
                            'fechaInicio'=>$request->fechaInicio,
                            'fechaFin'=>null]
                            
                );
                break;
                default:
                break;
               } 
               
                return \response()->json(['res'=>true,'message'=>'Ingreso Registrado Exitosamente'],200);
            }else{
                return \response()->json(['res'=>true,'message'=>'Ingreso Registrado Exitosamente'],200);
            }
        }

       
    } catch(Exception $ex){
        return \response()->json(['res'=>false,'message'=>'ERROR Se presento el siguiente Problema: '.$e->getMessage()],406);
    }
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try{ 
            
            $tipo=Vehiculo::select(['Tipo_Id'])
            ->where('placa','=',$request->placa)->first();
    
            if($tipo){
                $res=Bitacora::where('placa',$request->placa)->WhereNull('fechaFin')->update(['fechaFin'=>$request->fechaFin]);
                Estancia::where('vehiculo_placa',$request->placa)->WhereNull('fechaFin')->
                update(
                            ['fechaFin'=>$request->fechaFin,
                            'acumulado'=>\DB::raw('acumulado + '.$request->minutos)]
                    );
                return \response()->json(['res'=>true,'message'=>'Feliz Viaje Al Vehículo: '.$request->placa],200);
            }else{
                $precio=Precio::where('Tipo_Id','2')->select(['valor'])->first();
                if($precio){
                    $total=$precio->valor*$request->minutos;

                    $res=Bitacora::where('placa',$request->placa)->WhereNull('fechaFin')->update(['fechaFin'=>$request->fechaFin,'importe'=>$total]);

                    return \response()->json(['res'=>true,'message'=>'Placa: '.$request->placa.' Su total es de: $'.$total],200);
                }else{
                    return \response()->json(['res'=>true,'message'=>'ERROR: No se pudo realizar el calculo del total por estacionamiento'],406);
                }
            }
        } catch(Exception $ex){
            return \response()->json(['res'=>false,'message'=>'ERROR Se presento el siguiente Problema: '.$e->getMessage()],406);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
