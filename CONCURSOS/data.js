// data.js - Arquivo de dados dos concursos

const concursosData = {
    nacional: [
        {
            id: 1,
            orgao: "Banco do Brasil",
            sigla: "BB",
            cargo: "Escriturário",
            vagas: 3000,
            salario: "R$ 3.500,00",
            status: "abertos",
            inscricaoInicio: "2024-05-01",
            inscricaoFim: "2024-06-01",
            provaData: "2024-07-15",
            nivel: "Médio",
            linkEdital: "#",
            linkInscricao: "#"
        },
        {
            id: 2,
            orgao: "Correios",
            sigla: "ECT",
            cargo: "Carteiro",
            vagas: 1500,
            salario: "R$ 2.800,00",
            status: "previstos",
            inscricaoInicio: "2024-08-01",
            inscricaoFim: "2024-09-01",
            provaData: "2024-10-20",
            nivel: "Médio",
            linkEdital: "#",
            linkInscricao: "#"
        },
        {
            id: 3,
            orgao: "INSS",
            sigla: "INSS",
            cargo: "Técnico do Seguro Social",
            vagas: 2000,
            salario: "R$ 4.200,00",
            status: "encerrados",
            inscricaoInicio: "2024-01-15",
            inscricaoFim: "2024-02-15",
            provaData: "2024-03-20",
            nivel: "Médio",
            linkEdital: "#",
            linkInscricao: "#"
        },
        {
            id: 4,
            orgao: "Polícia Federal",
            sigla: "PF",
            cargo: "Agente",
            vagas: 500,
            salario: "R$ 12.000,00",
            status: "abertos",
            inscricaoInicio: "2024-04-15",
            inscricaoFim: "2024-05-15",
            provaData: "2024-06-30",
            nivel: "Superior",
            linkEdital: "#",
            linkInscricao: "#"
        }
    ],
    estados: {
        GO: [
            {
                id: 301,
                orgao: "Governo de Goiás",
                sigla: "GO",
                cargo: "Administrador",
                vagas: 200,
                salario: "R$ 5.000,00",
                status: "abertos",
                inscricaoInicio: "2024-04-20",
                inscricaoFim: "2024-05-20",
                provaData: "2024-06-25",
                nivel: "Superior",
                linkEdital: "#",
                linkInscricao: "#"
            }
        ],
        MA: [
            {
                id: 401,
                orgao: "Governo do Maranhão",
                sigla: "MA",
                cargo: "Professor",
                vagas: 800,
                salario: "R$ 3.500,00",
                status: "previstos",
                inscricaoInicio: "2024-06-01",
                inscricaoFim: "2024-07-01",
                provaData: "2024-08-15",
                nivel: "Superior",
                linkEdital: "#",
                linkInscricao: "#"
            }
        ],
        PA: [
            {
                id: 101,
                orgao: "Governo do Pará",
                sigla: "PA",
                cargo: "Professor",
                vagas: 500,
                salario: "R$ 3.200,00",
                status: "abertos",
                inscricaoInicio: "2024-05-10",
                inscricaoFim: "2024-06-10",
                provaData: "2024-07-25",
                nivel: "Superior",
                linkEdital: "#",
                linkInscricao: "#"
            }
        ],
        TO: [
            {
                id: 201,
                orgao: "Governo do Tocantins",
                sigla: "TO",
                cargo: "Enfermeiro",
                vagas: 150,
                salario: "R$ 4.500,00",
                status: "previstos",
                inscricaoInicio: "2024-07-01",
                inscricaoFim: "2024-08-01",
                provaData: "2024-09-15",
                nivel: "Superior",
                linkEdital: "#",
                linkInscricao: "#"
            }
        ]
    },
    municipios: {
        // Adicione concursos municipais aqui
    }
};