import { Card, CardContent, Checkbox, Radio, RadioGroup, FormGroup, FormControlLabel, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  selectedTransit: string;
  onTransitChange: (transit: string) => void;
  airlinesData: { key: string; label: string }[];
}

const labelSx = (selected: boolean) => ({
  "& .MuiFormControlLabel-label": {
    fontWeight: 700,
    color: selected ? "#ea580c" : undefined,
  },
});

const FlightFilter = ({
  selectedAirlines,
  onAirlinesChange,
  selectedSort,
  onSortChange,
  selectedTransit,
  onTransitChange,
  airlinesData
}: Props) => {
  const { t } = useTranslation();

  const effectiveAirlineValues = selectedAirlines.length === 0 ? ["all"] : selectedAirlines;

  const handleAirlineToggle = (value: string, checked: boolean) => {
    const values = checked
      ? [...effectiveAirlineValues, value]
      : effectiveAirlineValues.filter(v => v !== value);
    if (values.includes("all") && selectedAirlines.length !== 0) {
      onAirlinesChange([]);
    } else {
      onAirlinesChange(values.filter(v => v !== "all"));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
        <p className="font-extrabold text-xl text-slate-800 tracking-tight">{t('tickets.filter')}</p>
      </div>

      <Card className="border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="flex flex-col gap-8" sx={{ p: 4, "&:last-child": { pb: 4 } }}>
          {/* Sorting by Price */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">
              {t('tickets.order')}
            </p>
            <RadioGroup
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              sx={{ gap: 1.5 }}
            >
              <FormControlLabel value="low" control={<Radio color="warning" />} label={t('tickets.lowest_price')} sx={labelSx(selectedSort === "low")} />
              <FormControlLabel value="high" control={<Radio color="warning" />} label={t('tickets.highest_price')} sx={labelSx(selectedSort === "high")} />
            </RadioGroup>
          </div>

          <Divider className="bg-white/10" />

          {/* Transit Filter */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">
              {t('tickets.transit_placeholder')}
            </p>
            <RadioGroup
              value={selectedTransit}
              onChange={(e) => onTransitChange(e.target.value)}
              sx={{ gap: 1.5 }}
            >
              <FormControlLabel value="all" control={<Radio color="warning" />} label={t('tickets.all') || 'Semua'} sx={labelSx(selectedTransit === "all")} />
              <FormControlLabel value="direct" control={<Radio color="warning" />} label={t('tickets.direct')} sx={labelSx(selectedTransit === "direct")} />
              <FormControlLabel value="transit" control={<Radio color="warning" />} label={t('tickets.transit', { number: 1 }) || 'Transit'} sx={labelSx(selectedTransit === "transit")} />
            </RadioGroup>
          </div>

          <Divider className="bg-white/10" />

          {/* Airline Filter */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">
              {t('tickets.airline_placeholder')}
            </p>
            {airlinesData.length > 0 ? (
              <FormGroup sx={{ gap: 1.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="warning"
                      checked={effectiveAirlineValues.includes("all")}
                      onChange={(e) => handleAirlineToggle("all", e.target.checked)}
                    />
                  }
                  label={t('tickets.all_airlines') || 'Semua Maskapai'}
                  sx={labelSx(effectiveAirlineValues.includes("all"))}
                />
                {airlinesData.map((airline) => (
                  <FormControlLabel
                    key={airline.key}
                    control={
                      <Checkbox
                        color="warning"
                        checked={effectiveAirlineValues.includes(airline.key)}
                        onChange={(e) => handleAirlineToggle(airline.key, e.target.checked)}
                      />
                    }
                    label={airline.label}
                    sx={labelSx(effectiveAirlineValues.includes(airline.key))}
                  />
                ))}
              </FormGroup>
            ) : (
              <p className="text-xs text-slate-400 font-medium italic">No airlines available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightFilter;