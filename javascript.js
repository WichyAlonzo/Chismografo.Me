	var firebaseConfig = {
		apiKey: "AIzaSyB9s0IY1sQyd3jS96PdPc3KBCSl7VFaTK4",
		authDomain: "jr-arguelles.firebaseapp.com",
		databaseURL: "https://jr-arguelles-default-rtdb.firebaseio.com",
		projectId: "jr-arguelles",
		storageBucket: "jr-arguelles.appspot.com",
		messagingSenderId: "46118742765",
		appId: "1:46118742765:web:8924cd1e42dca81b607ae4",
		measurementId: "G-2NJYLW57JT"
	}

	firebase.initializeApp(firebaseConfig)
	
	const db = firebase.firestore()
	const form = document.querySelector('#task-form')
	const taskContainer = document.querySelector('#tasks-container')

	let editStatus = false
	let id = ''
	let time = new Date().toISOString()
	db.collection("chismografo").orderBy("fecha", "desc")

	const SaveUser = (nick,crush,sad,odio,ellano,live,eresfeliz,comida,razon,fecha) => {
		db.collection("chismografo").doc().set({
			nick,
			crush,
			sad,
			odio,
			ellano,
			live,
			eresfeliz,
			comida,
			razon,
			fecha
		})

		.then (function (docRef) {
			MJSOK();

		})

		.catch(function(error) {
			MSJERROR();

		});
	}

	const MJSOK =()=>{
		swal('Listo!', 'Se subieron tus respuesta al Chismografo 😎', 'success')
	}


	const MSJERROR =()=>{
		swal('Ops!', 'Errr', 'error')
	}


	const getTasks = () => db.collection('chismografo').get()
	const onGetTasks = (callback) => db.collection('chismografo').onSnapshot(callback)
	const getTask = (id) => db.collection('chismografo').doc(id).get()
	const updateTask = (id, updateTask) => db.collection('chismografo').doc(id).update(updateTask)

	window.addEventListener('DOMContentLoaded', async (e) => {
		db.collection("chismografo").orderBy("fecha", "desc")
		onGetTasks((querySnapshot) => {
			taskContainer.innerHTML = ''

			querySnapshot.forEach((doc) => {
				const task = doc.data()
				task.id = doc.id

				taskContainer.innerHTML += `
					<div class=".col-12 .col-md-8 card card-body mt-2 mx-2 border-divs">			
						<p id="styleTask">
								<b>1. Como te llamas o Nick?</b></p>
									<p>${task.nick}</p>
						<p id="styleTask">
								<b>2. Inicial del nombre de tu crush</b></p>
									<p>${task.crush}</p>
						<p id="styleTask">
								<b>3. ¿Por qué tan solo?</b></p>
									<p>${task.sad}</p>
						<p id="styleTask">
								<b>4. ¿Qué cosas odias de la gente?</b></p>
									<p>${task.odio}</p>
						<p id="styleTask">
								<b>5. Porque el/ella no te ama?</b></p>
									<p>${task.ellano}</p>
						<p id="styleTask">
								<b>6. Tu vida es lo que esperabas?</b></p>
									<p>${task.live}</p>
						<p id="styleTask">
								<b>7. Eres feliz?</b></p>
									<p>${task.eresfeliz}</p>
						<p id="styleTask">
								<b>8. Que comiste hoy?</b></p>
									<p>${task.comida}</p>
						<p id="styleTask">
								<b>9. Razón por la que te levantas en las mañanas?</b></p>
									<p>${task.razon}</p>

					</div>
				`
			})
		})
	})


$("#btnsave").on('click',()=>{

		let nick = $("#task-nick").val();
		let crush = $("#task-crush").val();
		let sad = $("#task-sad").val();
		let odio = $("#task-odio").val();
		let ellano = $("#task-coroto").val();
		let live = $("#task-live").val();
		let eresfeliz = $("#task-feliz").val();
		let comida = $("#task-comer").val();
		let razon = $("#task-razon").val();	
				let fecha = new Date();

				if (nick.length == 0 ||
						crush.length == 0 ||
						sad.length == 0 || 
						odio.length == 0 || 
						live.length == 0 ||
						ellano.length == 0 || 
						eresfeliz.length == 0 || 
						comida.length == 0 || 
						razon.length == 0) {
            		swal('Oye!', 'Debes completar todos los campos, no seas tramposo.', 'warning')
            		return false;
            			

		        }
		        return SaveUser(nick,crush,sad,odio,ellano,live,eresfeliz,comida,razon,fecha);			

			
			document.getElementById("task-form").reset();
			db.collection("chismografo").orderBy("fecha", "desc")
	
})