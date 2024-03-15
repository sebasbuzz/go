import { HubstaffTokenForm } from "./hubstaff-token/hubstaff-token-form"

export function HubstaffSettings() {
  return (
    <section>
      <div className="mb-40">
        <h2 className="mb-4 text-xl">Hubstaff</h2>
        <div className="text-sm text-muted">Configure Hubstaff settings</div>
      </div>
      <HubstaffTokenForm />
    </section>
  )
}

export default HubstaffSettings