// componentes/ModalTarefa.tsx
"use client";

import { useState } from "react";

interface ModalTarefaProps {
	onAdicionar: (titulo: string) => void;
	onFechar: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ onAdicionar, onFechar }) => {
	const [titulo, setTitulo] = useState("");

	const adicionarTarefa = () => {
		if (titulo.trim()) {
			onAdicionar(titulo);
			setTitulo("");
			onFechar();
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-80 shadow-lg">
				<h2 className="text-xl text-black font-bold mb-4">Nova Tarefa</h2>
				<input
					type="text"
					value={titulo}
					onChange={(e) => setTitulo(e.target.value)}
					placeholder="Digite a tarefa"
					className="w-full border border-gray-200 p-2 mb-4 text-black rounded"
				/>
				<div className="flex justify-between">
					<button onClick={onFechar} className="bg-red-500 hover:cursor-pointer text-white px-4 py-2 rounded">Cancelar</button>
					<button onClick={adicionarTarefa} className="bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded">Adicionar</button>
				</div>
			</div>
		</div>
	);
};

export default ModalTarefa;