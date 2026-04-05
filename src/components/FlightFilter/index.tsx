import { Card, CardBody, Checkbox, CheckboxGroup, Radio, RadioGroup, Divider } from "@nextui-org/react";
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
        <p className="font-extrabold text-xl text-slate-800 tracking-tight">{t('tickets.filter')}</p>
      </div>
      
      <Card className="glass-card border-none bg-white/10 backdrop-blur-3xl shadow-xl rounded-3xl overflow-hidden">
        <CardBody className="flex flex-col gap-8 p-8">
          {/* Sorting by Price */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">
              {t('tickets.order')}
            </p>
            <RadioGroup
              value={selectedSort}
              onValueChange={onSortChange}
              size="md"
              color="warning"
              classNames={{
                wrapper: "gap-3"
              }}
            >
              <Radio value="low" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.lowest_price')}</Radio>
              <Radio value="high" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.highest_price')}</Radio>
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
              onValueChange={onTransitChange}
              size="md"
              color="warning"
              classNames={{
                wrapper: "gap-3"
              }}
            >
              <Radio value="all" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.all') || 'Semua'}</Radio>
              <Radio value="direct" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.direct')}</Radio>
              <Radio value="transit" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.transit', { number: 1 }).replace('%{number}', '1') || 'Transit'}</Radio>
            </RadioGroup>
          </div>

          <Divider className="bg-white/10" />

          {/* Airline Filter */}
          <div className="flex flex-col gap-4">
            <p className="font-black text-xs uppercase text-slate-400 tracking-[0.2em]">
              {t('tickets.airline_placeholder')}
            </p>
            {airlinesData.length > 0 ? (
              <CheckboxGroup
                value={selectedAirlines.length === 0 ? ["all"] : selectedAirlines}
                onValueChange={(values) => {
                  if (values.includes("all") && selectedAirlines.length !== 0) {
                    onAirlinesChange([]);
                  } else {
                    onAirlinesChange(values.filter(v => v !== "all"));
                  }
                }}
                size="md"
                color="warning"
                classNames={{
                  wrapper: "gap-3"
                }}
              >
                <Checkbox value="all" className="data-[selected=true]:text-orange-600 font-bold">{t('tickets.all_airlines') || 'Semua Maskapai'}</Checkbox>
                {airlinesData.map((airline) => (
                  <Checkbox key={airline.key} value={airline.key} className="data-[selected=true]:text-orange-600 font-bold">
                    {airline.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            ) : (
              <p className="text-xs text-slate-400 font-medium italic">No airlines available</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FlightFilter;