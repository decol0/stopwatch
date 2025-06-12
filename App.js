import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [tempo, setTempo] = useState(0); // tempo em milissegundos
  const [rodando, setRodando] = useState(false);
  const timer = useRef(null);

  function iniciarPausar() {
    if (rodando) {
      clearInterval(timer.current);
      setRodando(false);
    } else {
      timer.current = setInterval(() => {
        setTempo(t => t + 10); // atualiza a cada 10ms
      }, 10);
      setRodando(true);
    }
  }

  function zerar() {
    clearInterval(timer.current);
    setTempo(0);
    setRodando(false);
  }

  function formatarTempo(ms) {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    const milissegundos = ms % 1000;

    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}:${String(milissegundos).padStart(3, '0')}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatarTempo(tempo)}</Text>

      <TouchableOpacity style={styles.botao} onPress={iniciarPausar}>
        <Text style={styles.textoBotao}>{rodando ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={zerar}>
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1C' },
  timer: { fontSize: 48, color: '#FFF', fontWeight: 'bold', marginBottom: 40 },
  botao: { backgroundColor: '#3FFFA8', padding: 14, borderRadius: 8, marginTop: 10, width: '60%', alignItems: 'center' },
  textoBotao: { color: '#000', fontWeight: 'bold', fontSize: 18 }
});
