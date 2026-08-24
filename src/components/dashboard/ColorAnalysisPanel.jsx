import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  fmtQty,
  calcCobertura,
  getWindowValue
} from "@/lib/dashboardData";

const WINDOWS = [
  { key: "consumo_1m", label: "Último mês" },
  { key: "consumo_3m", label: "Últimos 3 meses" },
  { key: "consumo_6m", label: "Últimos 6 meses" },
  { key: "consumo_12m", label: "Últimos 12 meses" },
];

export function ColorAnalysisPanel({ item, onBack }) {
  const [windowKey, setWindowKey] = useState("consumo_12m");

  const consumo = getWindowValue(item, windowKey, "consumo");

  const meses =
    windowKey === "consumo_1m"
      ? 1
      : windowKey === "consumo_3m"
      ? 3
      : windowKey === "consumo_6m"
      ? 6
      : 12;

  const consumoMedio = consumo / meses;
  const cobertura = calcCobertura(item);

  // Estoque consolidado = Nacional + Paraguai + EADI.
  const estoqueParaguai = Number(item.estoqueParaguai || 0);
  const estoqueEadi = Number(item.estoqueEadi || 0);
  const estoqueTotal = Number(item.estoque || 0);
  const estoqueNacional = Math.max(0, estoqueTotal - estoqueParaguai - estoqueEadi);

  // Compras consolidadas = Nacional + Paraguai.
  const comprasParaguai = Number(item.comprasParaguai || 0);
  const comprasTotal = Number(item.compras || 0);
  const comprasNacional = Math.max(0, comprasTotal - comprasParaguai);

  return (
    <Card className="p-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <h2 className="text-2xl font-bold">{item.codigo}</h2>

      <p className="text-muted-foreground mb-6">{item.descricao}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {WINDOWS.map(w => (
          <button
            key={w.key}
            onClick={() => setWindowKey(w.key)}
            className={`rounded-lg border px-4 py-2 text-sm ${
              windowKey === w.key
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-slate-50"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>

      {/* ESTOQUE */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Estoque por origem</div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="p-4 border-blue-100">
            <div className="text-xs text-blue-700">Estoque Total</div>
            <div className="text-2xl font-bold">{fmtQty(estoqueTotal)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Nacional + Paraguai + EADI</div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="text-xs text-slate-600">Estoque Nacional</div>
            <div className="text-2xl font-bold">{fmtQty(estoqueNacional)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Estoque físico nacional</div>
          </Card>

          <Card className="p-4 border-emerald-100">
            <div className="text-xs text-emerald-700">Estoque Paraguai</div>
            <div className="text-2xl font-bold">{fmtQty(estoqueParaguai)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Estoque físico Paraguai</div>
          </Card>

          <Card className="p-4 border-violet-100">
            <div className="text-xs text-violet-700">Estoque EADI</div>
            <div className="text-2xl font-bold">{fmtQty(estoqueEadi)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Estoque físico EADI</div>
          </Card>
        </div>
      </div>

      {/* COMPRAS */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Compras por origem</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-green-100">
            <div className="text-xs text-green-700">Compras Totais</div>
            <div className="text-2xl font-bold">{fmtQty(comprasTotal)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Nacional + Paraguai</div>
          </Card>

          <Card className="p-4 border-slate-200">
            <div className="text-xs text-slate-600">Compras Nacionais</div>
            <div className="text-2xl font-bold">{fmtQty(comprasNacional)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Quantidade em aberto</div>
          </Card>

          <Card className="p-4 border-emerald-100">
            <div className="text-xs text-emerald-700">Compras Paraguai</div>
            <div className="text-2xl font-bold">{fmtQty(comprasParaguai)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Quantidade em aberto Paraguai</div>
          </Card>
        </div>
      </div>

      {/* CONSUMO / COBERTURA */}
      <div>
        <div className="text-sm font-semibold mb-2">Consumo e cobertura</div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="p-4 border-orange-100">
            <div className="text-xs text-orange-700">Consumo</div>
            <div className="text-2xl font-bold">{fmtQty(consumo)}</div>
          </Card>

          <Card className="p-4 border-orange-100">
            <div className="text-xs text-orange-700">Consumo Médio</div>
            <div className="text-2xl font-bold">{fmtQty(consumoMedio)}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Média do período selecionado</div>
          </Card>

          <Card className="p-4 border-orange-100">
            <div className="text-xs text-orange-700">Cobertura</div>
            <div className="text-2xl font-bold">
              {Number.isFinite(cobertura.coberturaMeses)
                ? cobertura.coberturaMeses.toFixed(1)
                : "∞"} meses
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Baseada no estoque total</div>
          </Card>

          <Card className="p-4 border-red-100">
            <div className="text-xs text-red-700">Comprar</div>
            <div className="text-2xl font-bold text-red-600">
              {fmtQty(cobertura.qtdSugerida)}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}
