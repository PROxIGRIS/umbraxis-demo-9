import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadCloud, ShieldCheck, Clock, Trash2, Mail, Info, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * PrivacyPolicy.tsx
 * Premium Privacy Policy page component for a Science Exhibition website/app.
 *
 * NOTE: This is a template and should be reviewed by legal counsel for compliance
 * with local laws (GDPR, CCPA, etc.) before going live.
 */

/* Simple decorative animation (tiny spiral), re-using style from AboutV2 inspiration */
const spiralAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 240,
  w: 200,
  h: 200,
  nm: "Spiral",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle1",
      sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 240 }] },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [26, 26] } },
            { ty: "fl", c: { a: 0, k: [0.11, 0.60, 0.99, 1] }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
};

const POLICY_LAST_UPDATED = "2025-11-20";

const PrivacyPolicy: React.FC = () => {
  const [showPrefs, setShowPrefs] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(() => {
    try {
      return localStorage.getItem("exhibit_privacy_consent") === "true";
    } catch {
      return false;
    }
  });

  const [prefs, setPrefs] = useState({
    analytics: true,
    location: false,
    marketing: false,
    personalization: true,
  });

  // sync prefs from storage (if any)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("exhibit_privacy_prefs");
      if (raw) setPrefs(JSON.parse(raw));
    } catch (e) {
      // noop
    }
  }, []);

  function acceptAll() {
    setConsentGiven(true);
    localStorage.setItem("exhibit_privacy_consent", "true");
    localStorage.setItem("exhibit_privacy_prefs", JSON.stringify({
      analytics: true,
      location: true,
      marketing: true,
      personalization: true,
    }));
    setPrefs({ analytics: true, location: true, marketing: true, personalization: true });
  }

  function savePrefs() {
    setConsentGiven(true);
    localStorage.setItem("exhibit_privacy_consent", "true");
    localStorage.setItem("exhibit_privacy_prefs", JSON.stringify(prefs));
    setShowPrefs(false);
  }

  function revokeConsent() {
    setConsentGiven(false);
    localStorage.removeItem("exhibit_privacy_consent");
    localStorage.removeItem("exhibit_privacy_prefs");
    // implement any runtime cleanup e.g. stop analytics SDK, revoke tokens, etc.
  }

  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-background via-secondary to-background">
      {/* floating decorative blobs */}
      <div className="absolute -z-10 opacity-10 blur-3xl bg-primary/20 w-96 h-96 rounded-full left-4 top-20 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT: Intro */}
          <div className="lg:col-span-1 space-y-6">
            <Badge variant="orange" className="gap-2 inline-flex items-center">
              <ShieldCheck className="w-4 h-4" />
              Privacy & Safety
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-sm text-foreground/80 leading-relaxed">
              This policy explains how <strong>Science Exhibit</strong> collects, uses,
              stores, and protects personal data related to visitors, participants,
              volunteers, sponsors, and staff. We prioritize transparency and data-minimising design.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href="/privacy-policy.pdf"
                ref={downloadRef}
                className="inline-flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
                download
              >
                <DownloadCloud className="w-4 h-4" /> Download PDF
              </a>

              <Button
                onClick={() => setShowPrefs(true)}
                variant="outline"
                className="text-sm px-4 py-2 rounded-full"
              >
                Manage Preferences
              </Button>
            </div>

            <div className="rounded-xl p-4 bg-background/60 border border-primary/10 text-sm">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Last updated</div>
                  <div className="text-xs text-muted-foreground">{POLICY_LAST_UPDATED}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Policy content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow">
              <h2 className="text-xl font-semibold mb-4">Quick summary</h2>
              <ul className="list-disc pl-5 text-sm space-y-2 text-foreground/85">
                <li>We collect only what is necessary to run the exhibition and keep people safe.</li>
                <li>You control what we use — manage preferences at any time.</li>
                <li>We never sell personal data. We may share limited data with trusted third parties to provide core services (e.g. ticketing, venue security).</li>
                <li>Children under 16: we require parental consent for registration or data collection.</li>
              </ul>
            </div>

            {/* What we collect */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">1. What we collect</h3>
              <p className="text-sm text-foreground/85">
                We categorise data and collect the minimum required for each purpose:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="font-semibold">Identity & contact</div>
                  <div className="text-sm text-foreground/80">name, email, phone, emergency contact, ticket ID.</div>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold">Device & usage</div>
                  <div className="text-sm text-foreground/80">IP address, device model, app version, session logs, analytics (if enabled).</div>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold">Location & safety</div>
                  <div className="text-sm text-foreground/80">live GPS during guided experiences if you opt-in, venue zone check-ins for safety/evacuation.</div>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold">Media</div>
                  <div className="text-sm text-foreground/80">photos/videos from public spaces (we’ll post signage and seek consent where recording is used publicly).</div>
                </div>
              </div>
            </div>

            {/* How we use */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">2. How we use your data</h3>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li><strong>Event operations:</strong> tickets, check-in, queues, staff coordination, crowd safety.</li>
                <li><strong>Communications:</strong> confirmations, updates, emergency alerts.</li>
                <li><strong>Improvements:</strong> product analytics and quality improvements (only if analytics consented).</li>
                <li><strong>Legal & safety:</strong> to comply with laws, respond to incidents, and cooperate with authorities.</li>
              </ul>
            </div>

            {/* Legal basis & retention */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">3. Legal basis & retention</h3>
              <p className="text-sm text-foreground/85">
                Where applicable, we rely on legitimate interest, contract performance (tickets/registrations), consent, or legal obligation as a basis for processing. Retention is minimised:
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-3">
                <div className="p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">Ticket data</div>
                      <div className="text-xs text-muted-foreground">Kept for 3 years for audit & support</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">Analytics logs</div>
                      <div className="text-xs text-muted-foreground">Anonymised within 90 days</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">Emergency & CCTV</div>
                      <div className="text-xs text-muted-foreground">Held per local law; limited access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">4. Cookies & similar technologies</h3>
              <p className="text-sm text-foreground/85">
                We use cookies for essential site functionality and (with consent) for analytics and personalization. Available categories:
              </p>

              <ul className="list-disc pl-5 text-sm space-y-2">
                <li><strong>Strictly necessary:</strong> required for the site to work.</li>
                <li><strong>Analytics:</strong> anonymous usage data to improve the experience.</li>
                <li><strong>Marketing:</strong> third-party features only with consent.</li>
              </ul>
            </div>

            {/* Sharing & third parties */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">5. Sharing & third parties</h3>
              <p className="text-sm text-foreground/85">
                We never sell your personal data. We may share necessary information with:
              </p>

              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Payment processors (ticket payments)</li>
                <li>Ticketing & access control providers</li>
                <li>Venue safety teams and emergency services (when required)</li>
                <li>Third-party analytics if you opt in</li>
              </ul>
            </div>

            {/* Rights & contact */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">6. Your rights & contact</h3>
              <p className="text-sm text-foreground/85">
                You have rights to access, correct, delete, or restrict processing of your personal data. To exercise your rights or raise a privacy concern, contact:
              </p>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold">Data Protection Team</div>
                    <div className="text-xs text-muted-foreground">privacy@scienceexhibit.org</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border flex items-start gap-3">
                  <div className="font-semibold">Postal</div>
                  <div className="text-xs text-muted-foreground">Science Exhibit, 1234 Museum Ave, City, Country</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-3">If you are in the EU/UK you may also lodge a complaint with your supervisory authority.</p>
            </div>

            {/* Children */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">7. Children</h3>
              <p className="text-sm text-foreground/85">
                We do not knowingly collect personal data from children under 16 without parental consent. If you believe we have collected data about a child without consent, contact us to request deletion.
              </p>
            </div>

            {/* Security */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">8. Security & data minimisation</h3>
              <p className="text-sm text-foreground/85">
                We use standard administrative, technical, and physical safeguards. Access to personal data is restricted to authorised personnel. We continuously improve our security posture, but no system can be 100% secure — if a breach occurs we will notify affected parties in accordance with applicable law.
              </p>
            </div>

            {/* Changes */}
            <div className="rounded-2xl p-8 bg-background/60 border border-primary/10 shadow space-y-4">
              <h3 className="text-lg font-semibold">9. Changes to this policy</h3>
              <p className="text-sm text-foreground/85">
                We may update this policy to reflect operational or legal changes. We’ll publish the revised date at the top and notify registered users for material changes.
              </p>
            </div>

            <footer className="mt-6 text-xs text-muted-foreground">
              <div>© {new Date().getFullYear()} Science Exhibit. All rights reserved.</div>
              <div className="mt-2">This template is a starting point. Review by legal counsel is recommended before publishing.</div>
            </footer>
          </div>
        </div>
      </div>

      {/* Consent Banner */}
      {!consentGiven && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[min(95%,900px)] bg-background/95 border border-primary/20 rounded-xl p-4 shadow-lg flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="font-semibold">We care about your privacy</div>
                <div className="text-sm text-foreground/80">We use cookies and small data to run core features. Manage preferences or accept all to continue.</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setShowPrefs(true)} variant="outline" className="px-4 py-2 rounded-full">
              Manage
            </Button>
            <Button onClick={acceptAll} className="px-6 py-2 rounded-full">
              Accept all
            </Button>
            <button onClick={revokeConsent} className="p-2 rounded-full text-sm text-muted-foreground">
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPrefs && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPrefs(false)} />
          <div className="relative max-w-2xl w-full rounded-2xl bg-background/90 border p-6 shadow-2xl z-10">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">Manage privacy preferences</h4>
                <p className="text-xs text-muted-foreground">Toggle categories to customise what we process. You can change this later in Settings.</p>
              </div>
              <button onClick={() => setShowPrefs(false)} className="p-2 rounded-full bg-background/50">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <PrefRow
                label="Essential / Site functionality"
                description="Required for core site features: security, accessibility, and ticketing."
                enabled={true}
                disabled
                onToggle={() => {}}
              />
              <PrefRow
                label="Analytics"
                description="Anonymous usage data to improve exhibits and flow."
                enabled={prefs.analytics}
                onToggle={() => setPrefs(prev => ({ ...prev, analytics: !prev.analytics }))}
              />
              <PrefRow
                label="Location (optional)"
                description="Live location during guided experiences (only with explicit opt-in)."
                enabled={prefs.location}
                onToggle={() => setPrefs(prev => ({ ...prev, location: !prev.location }))}
              />
              <PrefRow
                label="Marketing & communications"
                description="Event updates, offers, partner promotions (only if you opt in)."
                enabled={prefs.marketing}
                onToggle={() => setPrefs(prev => ({ ...prev, marketing: !prev.marketing }))}
              />
              <PrefRow
                label="Personalization"
                description="Personalised content & recommendations."
                enabled={prefs.personalization}
                onToggle={() => setPrefs(prev => ({ ...prev, personalization: !prev.personalization }))}
              />
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowPrefs(false)}>Cancel</Button>
              <Button onClick={savePrefs}>Save preferences</Button>
            </div>
          </div>
        </div>
      )}

      {/* decorative animation bottom-right */}
      <div className="fixed bottom-8 right-8 w-36 h-36 opacity-25 pointer-events-none">
        <Lottie animationData={spiralAnimation} loop />
      </div>
    </section>
  );
};

export default PrivacyPolicy;

/* small reusable preference row component (kept here for single-file convenience) */
type PrefRowProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

const PrefRow: React.FC<PrefRowProps> = ({ label, description, enabled, onToggle, disabled }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>

      <div>
        <label className={`relative inline-flex items-center cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
          <input
            readOnly
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
            className="sr-only peer"
            disabled={disabled}
          />
          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-primary ${disabled ? "opacity-50" : ""} transition`} />
          <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition`} />
        </label>
      </div>
    </div>
  );
};
