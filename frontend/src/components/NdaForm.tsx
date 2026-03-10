"use client";

import { NdaFormData } from "@/types/nda";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export default function NdaForm({ data, onChange }: NdaFormProps) {
  function update(field: keyof NdaFormData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Agreement Details
        </h3>
        <div className="space-y-4">
          <Field label="Purpose">
            <textarea
              className={inputClass}
              rows={2}
              value={data.purpose}
              onChange={(e) => update("purpose", e.target.value)}
            />
          </Field>

          <Field label="Effective Date">
            <input
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => update("effectiveDate", e.target.value)}
            />
          </Field>

          <Field label="MNDA Term">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "expires"}
                  onChange={() => update("mndaTermType", "expires")}
                />
                Expires after
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  value={data.mndaTermYears}
                  onChange={(e) => update("mndaTermYears", e.target.value)}
                  disabled={data.mndaTermType !== "expires"}
                />
                year(s)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "continues"}
                  onChange={() => update("mndaTermType", "continues")}
                />
                Continues until terminated
              </label>
            </div>
          </Field>

          <Field label="Term of Confidentiality">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() => update("confidentialityTermType", "years")}
                />
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  value={data.confidentialityTermYears}
                  onChange={(e) =>
                    update("confidentialityTermYears", e.target.value)
                  }
                  disabled={data.confidentialityTermType !== "years"}
                />
                year(s) from Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() =>
                    update("confidentialityTermType", "perpetuity")
                  }
                />
                In perpetuity
              </label>
            </div>
          </Field>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Governing Law & Jurisdiction
        </h3>
        <div className="space-y-4">
          <Field label="Governing Law (State)">
            <input
              type="text"
              className={inputClass}
              placeholder="e.g., Delaware"
              value={data.governingLaw}
              onChange={(e) => update("governingLaw", e.target.value)}
            />
          </Field>
          <Field label="Jurisdiction">
            <input
              type="text"
              className={inputClass}
              placeholder="e.g., courts located in New Castle, DE"
              value={data.jurisdiction}
              onChange={(e) => update("jurisdiction", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Party 1</h3>
        <div className="space-y-4">
          <Field label="Full Name">
            <input
              type="text"
              className={inputClass}
              value={data.party1Name}
              onChange={(e) => update("party1Name", e.target.value)}
            />
          </Field>
          <Field label="Title">
            <input
              type="text"
              className={inputClass}
              value={data.party1Title}
              onChange={(e) => update("party1Title", e.target.value)}
            />
          </Field>
          <Field label="Company">
            <input
              type="text"
              className={inputClass}
              value={data.party1Company}
              onChange={(e) => update("party1Company", e.target.value)}
            />
          </Field>
          <Field label="Notice Address">
            <input
              type="text"
              className={inputClass}
              placeholder="Email or postal address"
              value={data.party1Address}
              onChange={(e) => update("party1Address", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Party 2</h3>
        <div className="space-y-4">
          <Field label="Full Name">
            <input
              type="text"
              className={inputClass}
              value={data.party2Name}
              onChange={(e) => update("party2Name", e.target.value)}
            />
          </Field>
          <Field label="Title">
            <input
              type="text"
              className={inputClass}
              value={data.party2Title}
              onChange={(e) => update("party2Title", e.target.value)}
            />
          </Field>
          <Field label="Company">
            <input
              type="text"
              className={inputClass}
              value={data.party2Company}
              onChange={(e) => update("party2Company", e.target.value)}
            />
          </Field>
          <Field label="Notice Address">
            <input
              type="text"
              className={inputClass}
              placeholder="Email or postal address"
              value={data.party2Address}
              onChange={(e) => update("party2Address", e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Modifications
        </h3>
        <Field label="MNDA Modifications (optional)">
          <textarea
            className={inputClass}
            rows={3}
            placeholder="List any modifications to the MNDA standard terms..."
            value={data.modifications}
            onChange={(e) => update("modifications", e.target.value)}
          />
        </Field>
      </section>
    </div>
  );
}
