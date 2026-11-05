export default function SpecTable({ rows, className = "" }: { rows: readonly (readonly [string, string])[]; className?: string }) {
  return (
    <dl className={`spec ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
