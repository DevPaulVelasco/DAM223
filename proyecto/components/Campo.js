import { TextInput, StyleSheet } from 'react-native';
import { colores } from './tema';
export const Campo = ({ placeholder, secure, style, ...resto }) => (
  <TextInput {...resto} editable={false} selectTextOnFocus={false} style={[s.input, style]} placeholder={placeholder} placeholderTextColor="#8491A5" secureTextEntry={secure} />
);
const s = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#DCE4EF', borderRadius: 12, backgroundColor: '#F9FBFE', paddingVertical: 14, paddingHorizontal: 14, marginBottom: 14, fontSize: 15, color: colores.texto },
});
