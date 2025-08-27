import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 20,
  },
  voltarContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  voltarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0a66c2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voltarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#0a66c2',
    borderRadius: 20,
    padding: 25,
    paddingTop: 40,
    width: '100%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    alignSelf: 'flex-start',
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
    backgroundColor: "#0a66c2",
    borderWidth: 1,
    borderColor: '#1E90FF',
    width: "100%",
    padding: 15,
    borderRadius: 15,
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
