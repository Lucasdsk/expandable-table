import React from "react";
import ReactDOM from "react-dom";

import MyTable from "./table";

import "./styles.css";

const MOCK = [
  {
    Id: 1534,
    Label: "ENZIMA BETA GLUCANASE",
    children: [
      {
        Id: 1,
        Label: "BR02 - Sergipe",
        children: [
          {
            Id: 589,
            Label: "Enzima Betaglucanase Ultraflo Fabi",
            UtilizacaoLivre: 392.8,
            ControleQualidade: 0,
            Bloqueado: 0,
            Consignado: 0,
            ProjecaoEstoqueHorizonte: 45,
            Ativo: true,
            Producao: true,
            children: [
              {
                Id: 20881169,
                Label: "R091303801",
                UtilizacaoLivre: 92.8,
                ControleQualidade: 0,
                Bloqueado: 0,
                Consignado: 0,
                Validade: 0,
                DiasPassados: 89,
                DiasVencimento: 89,
                Justificativa: ""
              },
              {
                Id: 20881170,
                Label: "R100503801",
                UtilizacaoLivre: 300,
                ControleQualidade: 0,
                Bloqueado: 0,
                Consignado: 0,
                Validade: 0,
                DiasPassados: 89,
                DiasVencimento: 87,
                Justificativa: ""
              }
            ]
          }
        ]
      }
    ]
  },
  {
    Id: 43,
    Label: "ENZIMA BETA GLUCANASE 2",
    children: [
      {
        Id: 1,
        Label: "BR02 - Sergipe",
        children: [
          {
            Id: 589,
            Label: "Enzima Betaglucanase Ultraflo Fabi",
            UtilizacaoLivre: 392.8,
            ControleQualidade: 0,
            Bloqueado: 0,
            Consignado: 0,
            ProjecaoEstoqueHorizonte: 45,
            Ativo: true,
            Producao: true,
            children: [
              {
                Id: 20881169,
                Label: "R091303801",
                UtilizacaoLivre: 92.8,
                ControleQualidade: 0,
                Bloqueado: 0,
                Consignado: 0,
                Validade: 0,
                DiasPassados: 89,
                DiasVencimento: 89,
                Justificativa: ""
              },
              {
                Id: 20881170,
                Label: "R100503801",
                UtilizacaoLivre: 300,
                ControleQualidade: 0,
                Bloqueado: 0,
                Consignado: 0,
                Validade: 0,
                DiasPassados: 89,
                DiasVencimento: 87,
                Justificativa: ""
              }
            ]
          },
          {
            Id: 5899,
            Label: "Enzima Ultraflo Fabi",
            UtilizacaoLivre: 392.8,
            ControleQualidade: 0,
            Bloqueado: 0,
            Consignado: 0,
            ProjecaoEstoqueHorizonte: 45,
            Ativo: true,
            Producao: true,
            children: [
              {
                Id: 20881169,
                Label: "R091303801",
                UtilizacaoLivre: 92.8,
                ControleQualidade: 0,
                Bloqueado: 0,
                Consignado: 0,
                Validade: 0,
                DiasPassados: 89,
                DiasVencimento: 89,
                Justificativa: ""
              }
            ]
          }
        ]
      }
    ]
  }
];

const handleClick = item => console.log("onclick", item);

const handleSelectItem = evt => {
  evt.stopPropagation();
  console.log("handleSelectItem", evt.target.value);
};

function App() {
  return (
    <div className="App">
      <MyTable
        data={MOCK}
        onClickItem={handleClick}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
