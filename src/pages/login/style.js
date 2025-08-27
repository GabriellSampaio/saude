import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
    imgContainer: {
    position: 'absolute',
    top: 35,
    left: '35%',
    zIndex: 10,
  },
  
  imgCircle: {
    width: 120, 
    height: 120,
    borderRadius: 60, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
  },

  formContainer: {
    backgroundColor: '#0158c8',
    borderTopLeftRadius: 65,
    padding: 25,
    paddingTop: 40,
    width: '101%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    alignSelf: 'center',
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: '#E0E0E0',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#8f8e8e57",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    color: '#fff',
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#0a66c2",
    fontWeight: "bold",
    fontSize: 18,
  },
  cadastroContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  naoPossuiContaText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  cadastroLink: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  errorText: {
    color: '#ffdddd',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default styles;
