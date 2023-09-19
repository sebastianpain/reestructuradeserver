
import suma from './suma.js'
let totalTest=0;
let succesFullTest=0;

console.log("1.debe devolver null si algun parametro no es numerico")

const resultado = suma(1,"2")
totalTest++
if (resultado ===null) {
    succesFullTest++
    console.log("test 1. -Exitoso")
}else{
    console.error('Test 1. -Fallido')
}
console.log("2.debe devolver 0 si no se pasa ningun parametro")

const resultado1 = suma()
totalTest++
if (resultado1 ===0) {
    succesFullTest++
    console.log("test 2. -Exitoso")
}else{
    console.error('Test 2. -Fallido')
}
console.log("3.debe devolver la suma correctamente")

const resultado2 = suma(10,5)
totalTest++
if (resultado1 ===15) {
    succesFullTest++
    console.log("test 2. -Exitoso")
}else{
    console.error('Test 2. -Fallido')
}
console.log("4.debe devolver la suma para cualquier cantidad de parametros")

const resultado4 = suma(10,5,5,7)
totalTest++;
if (resultado4 ===27) {
    succesFullTest++
    console.log("test 2. -Exitoso")
}else{
    console.error('Test 2. -Fallido')
}

console.log("======================================================================")
if(succesFullTest === totalTest){
    console.log( `Test Ejecutados satisfactoriamente ${succesFullTest} de ${totalTest} casos de prueba `)

}else{
    console.log( `Test Ejecutados satisfactoriamente ${succesFullTest} de ${totalTest} casos de prueba `)
}
console.log("======================================================================")