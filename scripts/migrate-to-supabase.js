/**
 * Run ONCE after Supabase is set up:
 * SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx node scripts/migrate-to-supabase.js
 */
const fs   = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) { console.error("Missing env vars"); process.exit(1); }

const supabase = createClient(url, key);

async function migrate() {
  const dir   = path.join(__dirname, "../content/activities");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
  console.log(`Migrating ${files.length} activities...`);

  for (const file of files) {
    const a   = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    const row = {
      slug: a.slug, title: a.title, short_desc: a.shortDesc,
      description: a.description, category: a.category,
      tags: a.tags || [], age_groups: a.ageGroups || [],
      price_range: a.priceRange, price_note: a.priceNote || "",
      lat: a.location.lat, lng: a.location.lng,
      address: a.location.address || "", area: a.location.area || "",
      photos: a.photos || [], opening_hours: a.openingHours || null,
      website: a.website || null, phone: a.phone || null,
      featured: a.featured || false, popularity: a.popularity || 5,
      audience: a.audience || "family", drop_off: a.dropOff || false,
      member_discount: a.memberDiscount || false,
      session_type: a.sessionType || null,
      session_lengths: a.sessionLengths || [],
      all_day_option: a.allDayOption || false,
      age_min: a.ageMin || null, age_max: a.ageMax || null,
      english_spoken: a.englishSpoken || false,
      has_food: a.hasFood || false, has_drinks: a.hasDrinks || false,
      legally_registered: a.legallyRegistered !== false,
    };
    const { error } = await supabase.from("activities").upsert(row, { onConflict: "slug" });
    console.log(error ? `  FAIL: ${a.slug} — ${error.message}` : `  OK:   ${a.slug}`);
  }
  console.log("\nDone.");
}
migrate().catch(console.error);
