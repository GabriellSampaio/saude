              value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.botaoTexto}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.cadastroContainer}>
              <Text style={styles.naoPossuiContaText}>não possui conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.cadastroLink}>cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}