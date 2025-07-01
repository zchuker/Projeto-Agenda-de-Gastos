import { StyleSheet, Text, View } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  containerM: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  nav: {
   
    height: '9%',
    width: '100%',
    gap: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  info: {

    flex: 1.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pBaixo: {
    
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
  },
  flat: {
    flex: 1,
    width: '100%',
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding:'2%'

  },
  botao: {

    flex: 1,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sair: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  enviar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  mc: {
    borderRadius: 20,
    width: '80%',
    maxHeight: '50%', 
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 20,
    gap: 15,
  },
  foto: {
    borderWidth: 1,
    height: '75%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  mod: {
    borderWidth: 1,
    flex: 1,
    width: '80%',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    gap: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  saldo: {
    borderWidth: 1,
    borderRadius: 20,
    width: '92%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  escolha: {
    borderWidth: 1,
    width: '75%',
    height: '28%',
    backgroundColor: '#2C2C2E',
    borderRadius: '10%',
    gap:22,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding:10

  },
  botao2: {
    textAlign:'center', 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: '#1db954',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  texto2: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  gasto: {
     textAlign:'center', 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: '#e53935',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  textoGasto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sSair: {
    backgroundColor: '#444444',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tSair: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});


