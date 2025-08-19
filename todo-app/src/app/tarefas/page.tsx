"use client";

import type React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/ModalTarefa";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-1 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-green-700 hover:bg-green-800 hover:border-none"
			: "bg-gray-400 hover:bg-gray-500 hover:border-none"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={() => escutarClique()}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TareafasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
	return (
		<div className="grid reverse grid-cols-1 md:grid-cols-2 gap-8">
			{[...dados].reverse().map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};



const Home = () => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
	const [mostrarModal, setMostrarModal] = useState(false);

	useEffect(() => {
		axios.get("https://dummyjson.com/todos")
			.then(res => {
				const tarefasDaAPI = res.data.todos.map((tarefa: any) => ({
					id: tarefa.id,
					title: tarefa.todo,
					completed: tarefa.completed,
				}));
				setTarefas(tarefasDaAPI);
			})
			.catch(err => {
				console.error("Erro ao buscar tarefas:", err);
			});
	}, []);

	const adicionarTarefa = (titulo: string) => {
		const novaTarefa: TarefaInterface = {
			id: tarefas.length + 1,
			title: titulo,
			completed: false,
		};
		setTarefas((prev) => [...prev, novaTarefa]);
	};

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />

			<div className="flex justify-end mb-4">
				<button 
					onClick={() => setMostrarModal(true)} 
					className="bg-pink-600 hover:cursor-pointer text-white px-10 py-2 rounded"
				>
					Nova Tarefa
				</button>
			</div>

			<Tarefas dados={tarefas} />

			{mostrarModal && (
				<ModalTarefa
					onAdicionar={adicionarTarefa}
					onFechar={() => setMostrarModal(false)}
				/>
			)}
		</div>
	);
};

export default Home;