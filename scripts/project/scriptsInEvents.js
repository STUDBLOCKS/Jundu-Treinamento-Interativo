


const scriptsInEvents = {

	async CarregaUsuarios_Event2_Act2(runtime, localVars)
	{
		const JSONStr = runtime.globalVars.Check;
		const object1 = JSON.parse(JSONStr);
		
		//  get all keys comma sep1arated 
		//console.log(Object.keys(object1).join())
		
		runtime.globalVars.Check = Object.keys(object1);
	},

	async Verificacpf_Event2_Act2(runtime, localVars)
	{
		//console.log('Funciona, tem 11 digitos')
		//console.log(runtime.globalVars.Login)
	},

	async Verificacpf_Event5_Act1(runtime, localVars)
	{
		const ValidaCPF = (cpf) => {
		
			cpf = cpf.replace(/\D/g, '')
			console.log(cpf)
			
			if(cpf.length !== 11){
				//console.error('CPF Inválido. Documento não possui 11 caracteres.')
				return
			}
			
			const proximoDigitoVerificador = (cpfIncompleto) => {
				let somatoria = 0
				for(let i = 0; i < cpfIncompleto.length;i++){
					let digitoAtual  = cpfIncompleto.charAt(i)
					
					let constante = (cpfIncompleto.length + 1 - i)
					
					somatoria += Number(digitoAtual) * constante
				}
				const resto = somatoria  % 11
				
				return resto < 2 ? "0": (11 - resto).toString()
		
			}
			let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9))
			let segundoDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9)+primeiroDigitoVerificador)
		
			let cpfcorreto = cpf.substring(0,9) + primeiroDigitoVerificador + segundoDigitoVerificador
			
			if (cpf !== cpfcorreto){
				//console.error('CPF Inválido. Documento  incorreto.')
				runtime.globalVars.cpfValido = 0
				//console.log(runtime.globalVars.cpfValido)
				return
			}
			//console.log('CPF Válido.')
			runtime.globalVars.cpfValido = 1
			//console.log(runtime.globalVars.cpfValido)
			return true
		}
		
		ValidaCPF(runtime.globalVars.Login)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

