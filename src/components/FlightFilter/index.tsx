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
    <div className="flex flex-col gap-3">
      <p className="font-medium text-lg">{t('tickets.filter')}</p>
      <Card shadow="sm">
        <CardBody className="flex flex-col gap-6 p-5">
          {/* Sorting by Price */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm uppercase text-gray-500 tracking-wider">
              {t('tickets.order')}
            </p>
            <RadioGroup
              value={selectedSort}
              onValueChange={onSortChange}
              size="sm"
              color="warning"
            >
              <Radio value="low">{t('tickets.lowest_price')}</Radio>
              <Radio value="high">{t('tickets.highest_price')}</Radio>
            </RadioGroup>
          </div>

          <Divider />

          {/* Transit Filter */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm uppercase text-gray-500 tracking-wider">
              {t('tickets.transit_placeholder')}
            </p>
            <RadioGroup
              value={selectedTransit}
              onValueChange={onTransitChange}
              size="sm"
              color="warning"
            >
              <Radio value="all">{t('tickets.all') || 'Semua'}</Radio>
              <Radio value="direct">{t('tickets.direct')}</Radio>
              <Radio value="transit">{t('tickets.transit', { number: 1 }).replace('%{number}', '1') || 'Transit'}</Radio>
            </RadioGroup>
          </div>

          <Divider />

          {/* Airline Filter */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm uppercase text-gray-500 tracking-wider">
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
                size="sm"
                color="warning"
              >
                <Checkbox value="all">{t('tickets.all_airlines') || 'Semua Maskapai'}</Checkbox>
                {airlinesData.map((airline) => (
                  <Checkbox key={airline.key} value={airline.key}>
                    {airline.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            ) : (

              <p className="text-xs text-gray-400 italic">No airlines available</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FlightFilter;