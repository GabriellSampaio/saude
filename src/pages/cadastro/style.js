import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a66c2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  voltar: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  voltarText: {
    color: "#fff",
    fontSize: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#0a66c2",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    color: "#fff",
    marginTop: 20,
  },
});
export default styles;