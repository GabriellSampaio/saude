import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: '#0158c8'
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain', // Mudei para 'contain' para garantir que o GIF não corte
    overflow: 'hidden',  
    borderRadius: 10      
  }
});