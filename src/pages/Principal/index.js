
import { Text, View, StatusBar, Pressable, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Modal, FlatList } from 'react-native';
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';





export default function principal() {
  const [visivel, setVisivel] = useState(false);
  const [visivel2, setVisivel2] = useState(false);
  const [visivel3, setVisivel3] = useState(false);
  const [contadorId, setContadorId] = useState(1);
  const [visualizar, setVisualizar] = useState(false);
  const [novoGasto, setNovoGasto] = useState('');
  const [idFlat, setIdFlat] = useState(0);
  const [desc, setDesc] = useState(false);
  const [descE, setDescE] = useState('');
  const [saldo, setSaldo] = useState('');
  const [mod, setMod] = useState(false);
  const [titulo, setTitulo] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [informacoes, setInformacoes] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('dados');
      if (dadosSalvos !== null) {

        setInformacoes(JSON.parse(dadosSalvos));

        const dados = JSON.parse(dadosSalvos);


        const ultimoId = dados.length > 0 ? Math.max(...dados.map(item => item.id)) : 0;
        setContadorId(ultimoId + 1);

        const saldoFinal = dados.reduce((acc, item) => {
          const valor = parseFloat(item.gasto.replace(/\D/g, '')) / 100;
          return acc + (item.mod ? valor : -valor);
        }, 0);
        setSaldo(saldoFinal);

        console.log('Dados carregados com sucesso:', JSON.parse(dadosSalvos));

      } else {
        console.log('Nenhum dado encontrado.');
      }
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
    }
  };


  const adicionarItem = () => {
    if (novoGasto.trim() === '') return;

    const listaAtual = Array.isArray(informacoes) ? informacoes : [];


    const soNumeros = novoGasto.replace(/\D/g, '');
    const valorNumero = parseFloat(soNumeros) / 100;

    if (isNaN(valorNumero)) {
      console.error('Valor inválido:', novoGasto);
      return;
    }

    let novoSaldo;
    if (mod) {
      novoSaldo = Number(saldo) + valorNumero;
    } else {
      novoSaldo = Number(saldo) - valorNumero;
    }
    setSaldo(novoSaldo);


    const novoItem = {
      id: contadorId,
      gasto: novoGasto,
      hora: formatarHora(),
      descE,
      saldoB: novoSaldo,
      mod: mod,
    };

    const novaLista = [...listaAtual, novoItem];

    setInformacoes(novaLista);
    setDescE('');
    setContadorId(prev => prev + 1);
    setNovoGasto('');
    setVisivel(false);

    AsyncStorage.setItem('dados', JSON.stringify(novaLista))
      .then(() => {


        console.log('Dados salvos');
      })
      .catch(error => {
        console.error('Erro ao salvar dados', error);
      });
  };



  const mostrar = () => {
    setVisivel3(true);
  }
  const sair = () => {

    setVisivel(false)
  }
  const sair2 = () => {

    setVisivel2(false)
  }
  const sair3 = () => {

    setVisivel3(false)
  }
  const deletar = async (idParaRemover) => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('dados');

      if (dadosSalvos !== null) {
        const dados = JSON.parse(dadosSalvos);

        const novosDados = dados.filter(item => item.id !== idParaRemover);

        await AsyncStorage.setItem('dados', JSON.stringify(novosDados));

        setInformacoes(novosDados);

        console.log('Item removido com sucesso');
      }
    } catch (erro) {
      console.error('Erro ao remover item:', erro);
    }
  };

  const atualizar = async (idParaAtualizar) => {

    try {
      const dadosSalvos = await AsyncStorage.getItem('dados');

      if (dadosSalvos !== null) {
        const dados = JSON.parse(dadosSalvos);

        const soNumeros = novoGasto.replace(/\D/g, '');
        const valorNumero = parseFloat(soNumeros) / 100;

        let novoSaldo;

        const itemAtual = dados.find(item => item.id === idParaAtualizar);

        if (!itemAtual) {
          console.error('Item para atualizar não encontrado');
          return;
        }

        const valorAntigo = parseFloat(itemAtual.gasto.replace(/\D/g, '')) / 100;

        if (itemAtual.mod) {
          novoSaldo = saldo - valorAntigo + valorNumero;
        } else {
          novoSaldo = saldo + valorAntigo - valorNumero;
        }
        setSaldo(novoSaldo);


        const dadosAtualizados = dados.map(item => {
          if (item.id === idParaAtualizar) {
            return { ...item, gasto: novoGasto, hora: formatarHora(), descE, saldoB: saldo };
          }
          return item;
        });

        await AsyncStorage.setItem('dados', JSON.stringify(dadosAtualizados));

        setInformacoes(dadosAtualizados);
        setVisivel2(false);
        console.log('Item atualizado com sucesso');
      }
    } catch (erro) {
      console.error('Erro ao atualizar item:', erro);
    }
  };
  const abrirModalAtualizacao = (id, gastoAtual, descrição) => {
    setIdEditando(id);
    setNovoGasto(gastoAtual);
    setDescE(descrição)
    setVisivel2(true);
  };
  const olho = () => {
    setVisualizar(true)
  }
  const olhoF = () => {
    setVisualizar(false)
  }
  const escolha = (valor) => {
    if (valor == 1) {
      setVisivel(true)
      setMod(true)
      setTitulo(true)
      sair3()

    }
    else {

      setVisivel(true)
      setMod(false)
      setTitulo(false)
      sair3();
    }

  }
  const mudDesc = (id) => {
    setIdFlat(id)
    if (desc) {
      setDesc(false)
    } else {
      setDesc(true)
    }

  }
  const formatarHora = () => {
    const hora = new Date().getHours().toString().padStart(2, "0")
    const minuto = new Date().getMinutes().toString().padStart(2, "0")
    const horaFormatada = hora + ":" + minuto;
    return horaFormatada;
  }
  const formatarMoeda = (valor) => {


    const apenasNumeros = valor.replace(/\D/g, '');
    const valorFloat = parseFloat(apenasNumeros) / 100;

    if (isNaN(valorFloat)) return '';

    return valorFloat.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleChange = (text) => {
    const formatado = formatarMoeda(text);
    if (formatado.length > 15) return;
    setNovoGasto(formatado);
  };

  return (

    <View style={styles.container}>

      <View style={styles.nav}>
        <View style={{ borderWidth: 1, width: '30%' }}>

        </View>
        <View style={styles.mod}>

          {!visualizar ?
            <Pressable onPress={() => olho()} style={{ height: '50%', width: '30%', justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={require('./img/Olho aberto.png')}></Image>
            </Pressable>
            :
            <Pressable onPress={() => olhoF()} style={{ height: '50%', width: '30%', justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={require('./img/Olho fechado.png')}></Image>
            </Pressable>
          }
          <View style={styles.foto}>
            <Image resizeMode='contain' source={require('./img/usuario-de-perfil.png')} style={{ width: '80%', height: '80%' }} />
          </View>

        </View>
      </View>

      <View style={styles.info} >

        <View style={styles.flat}>

          <View style={styles.saldo}>


            <Text style={{ fontSize: 32, width: '100%', textAlign: 'center', color: !visualizar ? saldo > 0 ? '#00ff99' : saldo < 0 ? '#ff4d4d' : 'gray' : 'gray' }}>
              {saldo < 0 ? !visualizar ? ' ' : '-' : ''}
              {!visualizar ? formatarMoeda(Number(saldo).toFixed(2).replace('.', ',')) :
                'R$ ' + '•'.repeat(` ${Number(saldo).toFixed(2).replace('.', ',')}`.length)}
            </Text>
          </View>

          <FlatList inverted={true} style={{ width: '100%', padding: 8 }} data={informacoes} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (

            <Animatable.View animation={'fadeInUp'} style={{
              display: 'flex', borderWidth: 1, borderRadius: 20,
              flexDirection: 'column',
              alignItems: 'center', width: '100%', flex: 1, marginTop: '4%',

            }}>

              <View style={{
                display: 'flex', borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: '#1E1E1E',
                padding: '5%', flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', width: '100%', flex: 1
              }}>

                <View style={{ width: '45%' }}>

                  {item.mod ? (
                    <TextInput
                      value={item.gasto}
                      editable={false}
                      pointerEvents="none"
                      style={{ fontSize: 20, width: '100%', color: '#00ff99' }}
                    />
                  ) : (
                    <TextInput
                      value={'- ' + item.gasto}
                      editable={false}
                      pointerEvents="none"
                      style={{ fontSize: 20, width: '100%', color: '#ff4d4d' }}
                    />
                  )}


                </View>
                <View style={{ width: '20%' }}><Text style={{ fontSize: 20, color: '#fff' }}> {item.hora}</Text></View>

                <View style={{ width: '20%', height: '100%', alignItems: 'center' }}>
                  <Pressable onPress={() => deletar(item.id)} style={{ width: '100%', flex: 1 }}>
                    <Image style={{ width: '100%', height: '90%' }} resizeMode='contain' source={require('./img/borracha.png')}></Image>
                  </Pressable>
                </View>

                <View style={{ width: '20%', height: '100%', alignItems: 'center' }}>
                  <Pressable onPress={() => abrirModalAtualizacao(item.id, item.gasto, item.descE)} style={{ width: '100%', height: '100%' }}>
                    <Image style={{ width: '100%', height: '90%' }} resizeMode='contain' source={require('./img/lapis.png')}></Image>
                  </Pressable>

                </View>

              </View>
              {desc && idFlat === item.id ? (
                <Text style={{ opacity: 0.5, textAlign: 'left', borderWidth: 0, width: '100%', backgroundColor: '#1E1E1E', color: '#fff' }}>
                  Descrição: {item.descE}
                </Text>
              ) : null}

              <Pressable onPress={() => mudDesc(item.id)} style={{ borderTopWidth: 1, width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>

                <Text style={{
                  width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex',
                  flexDirection: 'column', backgroundColor: '#3e3e3e', borderBottomRightRadius: 20, borderBottomLeftRadius: 20
                }}>

                  {desc && idFlat === item.id ?
                    <Image style={{ height: 25, transform: [{ scaleX: -1 }, { scaleY: -1 }] }} resizeMode='contain' source={require('./img/Seta.png')} /> :
                    <Image style={{ height: 25 }} resizeMode='contain' source={require('./img/Seta.png')} />}

                </Text>
              </Pressable>

            </Animatable.View>

          )} />


        </View>

      </View>

      <View style={styles.pBaixo} >
        <View style={styles.botao}>

          <Pressable style={{ width: '100%', flex: 1, justifyContent: 'center' }} onPress={() => mostrar()}>
            <Image resizeMode='contain' source={require('./img/botao-adicionar.png')} style={{ width: '100%', height: '85%' }} />
          </Pressable>
        </View>

      </View>

      <Modal visible={visivel} transparent={true} style={{ justifyContent: 'center' }}>
        
        <BlurView intensity={70} tint="dark" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
         
          <Animatable.View animation={'fadeInDown'} style={styles.containerM}>

            <View style={styles.mc}>
             
              <Text style={{ width: '100%', fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: titulo ? '#00ff99' : '#ff4d4d' }}>{titulo ? 'Deposito' : 'Gasto'}</Text>
             
              <TextInput style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: '22%', color: '#fff', }} placeholderTextColor="#fff" placeholder="Digite o valor"
                value={novoGasto}
                onChangeText={handleChange}
                keyboardType="numeric" />
             
              <TextInput style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: '22%', color: '#fff', }} placeholderTextColor="#fff"
                placeholder='Digite a descrição' onChangeText={(text) => setDescE(text)} />
             
              <View style={{ width: '96%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={styles.sair}>

                  <Pressable onPress={() => sair()} style={styles.sSair}>

                    <Text style={styles.tSair}>sair</Text>

                  </Pressable>

                </View>
                <View style={styles.enviar}>

                  <Pressable onPress={() => adicionarItem()}>

                    <Text style={styles.tSair}>enviar</Text>

                  </Pressable>
                </View>

              </View>
            </View>


          </Animatable.View>
        </BlurView>
      </Modal>

      <Modal visible={visivel2} transparent={true}>

        <BlurView intensity={70} tint="dark" style={{ width: '100%', height: '100%' }}>
         
          <Animatable.View animation={'fadeInDown'} style={styles.containerM}>

            <View style={styles.mc}>

              <Text style={{ width: '100%', fontSize: 20, textAlign: 'center', color: '#fff' }}>Atualização de informações</Text>

              <TextInput style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: '22%', color: '#fff' }}
                value={novoGasto}
                onChangeText={handleChange}
                keyboardType="numeric" />

              <TextInput style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: '20%', color: '#fff' }} value={descE} onChangeText={(text) => setDescE(text)} />

              <View style={{ width: '96%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={styles.sair}>

                  <Pressable onPress={() => setVisivel2(false)} style={styles.sSair}>
                    
                    <Text style={styles.tSair}>sair</Text>

                  </Pressable>

                </View>
                <View style={styles.enviar}>
                  
                  <Pressable onPress={() => adicionarItem()}>

                    <Text style={styles.tSair}>enviar</Text>

                  </Pressable>
                
                </View>

              </View>

            </View>


          </Animatable.View>
        </BlurView>
      </Modal>

      <Modal visible={visivel3} transparent={true}>
        
        <BlurView intensity={70} tint="dark" style={{ width: '100%', height: '100%' }}>
    
          <Animatable.View animation={'fadeInDown'} style={styles.containerM}>

            <View style={styles.escolha}>
             
              <View style={{ width: '96%', height: '12%', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 5 }}>
             
                <Pressable style={{ width: '100%', height: '110%' }} onPress={() => setVisivel3(false)}>
             
                  <Text style={{ width: '100%', color: 'red', fontSize: 20 }}>X</Text>
             
                </Pressable>

              </View>
              <View style={{ height: '20%', width: '60%', alignItems: 'center',marginBottom:25 }}>
            
                <Text style={{ fontSize: 30, color: '#fff' }}> Escolha </Text>
            
              </View>
            
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '24%', }}>
            
                <Pressable onPress={() => escolha(1)} style={styles.botao2}>
            
                  <Text style={styles.texto2}>Depósito</Text>
            
                </Pressable>

                <Pressable onPress={() => escolha(2)} style={styles.gasto}>
            
                  <Text style={styles.textoGasto}>Gasto</Text>
            
                </Pressable>

              </View>
            </View>

          </Animatable.View>
        </BlurView>
      </Modal>
     
      <StatusBar style="auto" />

    </View>
  );
}
