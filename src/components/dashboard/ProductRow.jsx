import { fmtQty, calcCobertura } from "@/lib/dashboardData";

export function ProductRow({ produto, selected, onSelect }) {
  const c = calcCobertura(produto);
  const nacional = produto.estoque - produto.estoqueParaguai - produto.estoqueEadi;

  return (
    <div onClick={onSelect} className={`rounded-lg border p-3 cursor-pointer ${selected ? "border-blue-500 bg-blue-50" : "bg-white hover:bg-slate-50"}`}>
      <div className="flex justify-between">
        <strong>{produto.codigo}</strong>
        <span className="font-semibold">{fmtQty(produto.estoque)}</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{produto.descricao}</div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div><div>Nacional</div><strong>{fmtQty(nacional)}</strong></div>
        <div><div>Paraguai</div><strong className="text-emerald-700">{fmtQty(produto.estoqueParaguai)}</strong></div>
        <div><div>EADI</div><strong className="text-violet-700">{fmtQty(produto.estoqueEadi)}</strong></div>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
        <div><div>Comp.</div><strong>{fmtQty(produto.compras)}</strong></div>
        <div><div>Cons.</div><strong>{fmtQty(produto.consumo)}</strong></div>
        <div><div>Cob.</div><strong>{Number.isFinite(c.coberturaMeses) ? c.coberturaMeses.toFixed(1) : "∞"}</strong></div>
        <div><div>Comprar</div><strong className="text-red-600">{fmtQty(c.qtdSugerida)}</strong></div>
      </div>
    </div>
  );
}
