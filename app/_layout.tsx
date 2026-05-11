import { useColorScheme } from '@/hooks/use-color-scheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import 'react-native-reanimated';

const COLOR_TITLES = "#525151";
const COLOR_PLACEHOLDER = "#adaaaa";

export default function RootLayout() {
  const [statusmodal, setStatusModal] = useState(false);
  const [msg, setMsg] = useState('');
  const [statuserror, setStatusError] = useState(false);
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [ideia, setIdeia] = useState('');
  const [errorNome, setErrorNome] = useState(false);
  const [errorBairro, setErrorBairro] = useState(false);
  const [errorIdeia, setErrorIdeia] = useState(false);
  const refNome = useRef<TextInput>(null);
  const refBairro = useRef<TextInput>(null);
  const refIdeia = useRef<TextInput>(null);
  const colorScheme = useColorScheme();

  const onDismissSnackBar = () => {
    setStatusModal(!statusmodal);
  };

  const sendMessage = () => {
    if (nome.length <= 3) {
      setErrorNome(true);
      setStatusError(true);
      setStatusModal(true);
      setMsg('Informe seu nome...');
      refNome.current?.focus();
      return;
    }else{
      setErrorNome(false);
      setStatusError(false);
      setStatusModal(false);
    }
    if (bairro.length <= 3) {
      setErrorBairro(true);
      setStatusError(true);
      setStatusModal(true);
      setMsg('Informe seu bairro...');
      refBairro.current?.focus();
      return;
    }else{
      setErrorBairro(false);
      setStatusError(false);
      setStatusModal(false);
    }
    if (ideia.length <= 3) {
      setErrorIdeia(true);
      setStatusError(true);
      setStatusModal(true);
      setMsg('Informe sua ideia...');
      refIdeia.current?.focus();
      return;
    }else{
      setErrorIdeia(false);
      setStatusError(false);
      setStatusModal(false);
    }
    setStatusModal(true);
    setMsg(`Olá ${nome}, obrigado por compartilhar sua ideia com o Conecta Bairro!`);
    setNome('');
    setBairro('');
    setIdeia('');
    return true;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={style.container}>
        <View style={style.statusbar}></View>
        <View style={style.header}>
          <FontAwesome name="connectdevelop" size={28} color="#ffffff" />
          <Text style={style.txtheader}>Conecta Bairro</Text>
        </View>
        <View style={style.content}>
          <View style={style.ctcontent}>
            <View style={style.cttitle}>
              <AntDesign name="share-alt" size={24} color={COLOR_TITLES} />
              <Text style={style.txttitle}>Compartilhe sua ideia através do app Conecta Bairro.</Text>
            </View>
            <Text style={style.labels}>Informe seu nome: </Text>
            <TextInput
              style={!errorNome ? style.inputs : style.errorCampos}
              value={nome}
              ref={refNome}
              placeholder="Nome"
              placeholderTextColor={COLOR_PLACEHOLDER}
              onChangeText={(text) => setNome(text)}
            />
            <Text style={style.labels}>Informe seu bairro: </Text>
            <TextInput
              style={!errorBairro ? style.inputs : style.errorCampos}
              value={bairro}
              ref={refBairro}
              placeholder="Bairro"
              placeholderTextColor={COLOR_PLACEHOLDER}
              onChangeText={(text) => setBairro(text)}
            />
            <Text style={style.labels}>Informe sua idéia: </Text>
            <TextInput
              style={[!errorIdeia ? style.inputs : style.errorCampos, { minHeight: 150, alignItems: 'flex-start' }]}
              multiline={true}
              value={ideia}
              ref={refIdeia}
              textAlignVertical="top"
              numberOfLines={6}
              placeholder="Sua idéia"
              placeholderTextColor={COLOR_PLACEHOLDER}
              onChangeText={(text) => setIdeia(text)}
            />
            <TouchableOpacity style={style.buttom} activeOpacity={0.7} onPress={sendMessage}>
              <FontAwesome name="send" size={16} color="#ffffff" />
              <Text style={style.txtbuttom}>Enviar idéia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
      <Snackbar
        visible={statusmodal}
        onDismiss={onDismissSnackBar}
        style={statuserror ? style.snackerror : style.snacksuccess}
        wrapperStyle={{
          top: 88,
          alignSelf: 'center'
        }}
        action={{
          label: 'Fechar',
          labelStyle: {
            color: '#ffffff',
            fontWeight: 'bold'
          },
          onPress: () => {
            // Do something
          },
        }}>
        <Text style={style.txtmsg}>{msg}</Text>
      </Snackbar>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#facbf4',
  },
  statusbar: {
    width: '100%',
    height: 34,
    backgroundColor: '#3e0558'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#580b70',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtheader: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '900',
    marginLeft: 8
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  ctcontent: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 4,
    padding: 8
  },
  cttitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  txttitle: {
    marginLeft: 8,
    color: COLOR_TITLES,
    fontWeight: '800'
  },
  labels: {
    fontFamily: 'Roboto-Regular',
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#afaeae',
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4d4c4c',
    marginBottom: 18,
  },
  buttom: {
    flexDirection: 'row',
    backgroundColor: "#3e0558",
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  txtbuttom: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 8
  },
  snackerror: {
    backgroundColor: '#e70b0b',
  },
  snacksuccess: {
    backgroundColor: '#006e18',
  },
  txtmsg: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  errorCampos: {
    borderWidth: 1,
    borderColor: '#e70b0b',
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4d4c4c',
    marginBottom: 18,
  }
});