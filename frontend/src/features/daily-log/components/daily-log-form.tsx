import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ApiError } from "../../../lib/api";
import {
  createDailyLogSchema,
  type CreateDailyLogInput
} from "../schema";
import { useCreateDailyLogMutation } from "../hooks/use-create-daily-log";

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

const defaultValues: CreateDailyLogInput = {
  date: getTodayDateString(),
  moodRating: 6,
  anxietyLevel: 4,
  sleepHours: 7,
  sleepQuality: 6,
  sleepDisturbances: undefined,
  physicalActivityType: undefined,
  physicalActivityDurationMin: undefined,
  socialInteractionLevel: 5,
  stressLevel: 5,
  depressionSymptoms: 3,
  anxietySymptoms: 4,
  notes: undefined
};

type FieldProps = {
  label: string;
  helper: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, helper, error, children }: FieldProps) {
  return (
    <label className="form-field">
      <span className="field-label">{label}</span>
      <span className="field-help">{helper}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

type SliderFieldProps = {
  label: string;
  helper: string;
  error?: string;
  id: keyof CreateDailyLogInput;
  min?: number;
  max?: number;
  register: ReturnType<typeof useForm<CreateDailyLogInput>>["register"];
  watchValue: number;
};

function SliderField({
  label,
  helper,
  error,
  id,
  min = 1,
  max = 10,
  register,
  watchValue
}: SliderFieldProps) {
  return (
    <Field error={error} helper={helper} label={label}>
      <div className="range-row">
        <input
          {...register(id, { valueAsNumber: true })}
          className="range-input"
          max={max}
          min={min}
          step={1}
          type="range"
        />
        <span className="range-value">{watchValue}</span>
      </div>
    </Field>
  );
}

export function DailyLogForm() {
  const mutation = useCreateDailyLogMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful }
  } = useForm<CreateDailyLogInput>({
    resolver: zodResolver(createDailyLogSchema),
    defaultValues
  });

  const watchedRatings = watch([
    "moodRating",
    "anxietyLevel",
    "sleepQuality",
    "socialInteractionLevel",
    "stressLevel",
    "depressionSymptoms",
    "anxietySymptoms"
  ]);

  const serverMessage = useMemo(() => {
    if (!mutation.error) {
      return null;
    }

    if (mutation.error instanceof ApiError) {
      return mutation.error.message;
    }

    return "We could not save today's entry. Please try again.";
  }, [mutation.error]);

  const onSubmit = handleSubmit(async (values: CreateDailyLogInput) => {
    await mutation.mutateAsync(values);

    reset({
      ...defaultValues,
      date: values.date
    });
  });

  return (
    <section className="panel form-panel">
      <div className="form-panel-heading">
        <div>
          <h2>Daily check-in</h2>
          <p className="list-note">
            A short reflection is enough. The goal is to notice patterns, not to
            write a perfect report.
          </p>
        </div>

        <span className="status-badge">
          <span className="status-dot" />
          Usually under 2 minutes
        </span>
      </div>

      <form className="daily-log-form" onSubmit={onSubmit}>
        <section className="form-section">
          <div className="form-section-copy">
            <h3>Today at a glance</h3>
            <p>Start with the essentials for this specific day.</p>
          </div>

          <div className="form-grid">
            <Field
              error={errors.date?.message}
              helper="Choose the date you are reflecting on."
              label="Date"
            >
              <input
                {...register("date")}
                className="text-input"
                type="date"
              />
            </Field>

            <Field
              error={errors.sleepHours?.message}
              helper="Include naps only if they meaningfully affected the day."
              label="Sleep hours"
            >
              <input
                {...register("sleepHours", { valueAsNumber: true })}
                className="text-input"
                max={24}
                min={0}
                step={0.5}
                type="number"
              />
            </Field>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-copy">
            <h3>Core signals</h3>
            <p>Use a 1 to 10 scale where 10 means more intensity.</p>
          </div>

          <div className="form-grid">
            <SliderField
              error={errors.moodRating?.message}
              helper="1 = very low mood, 10 = very positive mood."
              id="moodRating"
              label="Mood"
              register={register}
              watchValue={watchedRatings[0]}
            />

            <SliderField
              error={errors.anxietyLevel?.message}
              helper="How present or disruptive anxiety felt today."
              id="anxietyLevel"
              label="Anxiety"
              register={register}
              watchValue={watchedRatings[1]}
            />

            <SliderField
              error={errors.sleepQuality?.message}
              helper="How restorative your sleep felt overall."
              id="sleepQuality"
              label="Sleep quality"
              register={register}
              watchValue={watchedRatings[2]}
            />

            <SliderField
              error={errors.socialInteractionLevel?.message}
              helper="How much meaningful social contact you had."
              id="socialInteractionLevel"
              label="Social interaction"
              register={register}
              watchValue={watchedRatings[3]}
            />

            <SliderField
              error={errors.stressLevel?.message}
              helper="How pressured or overwhelmed the day felt."
              id="stressLevel"
              label="Stress"
              register={register}
              watchValue={watchedRatings[4]}
            />

            <SliderField
              error={errors.depressionSymptoms?.message}
              helper="Rate how noticeable depressive symptoms felt."
              id="depressionSymptoms"
              label="Depression symptoms"
              register={register}
              watchValue={watchedRatings[5]}
            />

            <SliderField
              error={errors.anxietySymptoms?.message}
              helper="Rate the severity of anxiety-related symptoms."
              id="anxietySymptoms"
              label="Anxiety symptoms"
              register={register}
              watchValue={watchedRatings[6]}
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-copy">
            <h3>Context and notes</h3>
            <p>Only add what feels useful. Optional fields can stay blank.</p>
          </div>

          <div className="form-grid">
            <Field
              error={errors.sleepDisturbances?.message}
              helper="Examples: woke up once, vivid dreams, noise."
              label="Sleep disturbances"
            >
              <textarea
                {...register("sleepDisturbances")}
                className="text-area"
                rows={3}
              />
            </Field>

            <Field
              error={errors.physicalActivityType?.message}
              helper="Examples: walk, gym, stretching, cycling."
              label="Physical activity"
            >
              <input
                {...register("physicalActivityType")}
                className="text-input"
                placeholder="Walk, yoga, gym..."
                type="text"
              />
            </Field>

            <Field
              error={errors.physicalActivityDurationMin?.message}
              helper="Leave blank if there was no activity worth logging."
              label="Activity duration (minutes)"
            >
              <input
                {...register("physicalActivityDurationMin")}
                className="text-input"
                min={0}
                step={5}
                type="number"
              />
            </Field>

            <Field
              error={errors.notes?.message}
              helper="Anything that helps future-you understand this day better."
              label="Notes"
            >
              <textarea
                {...register("notes")}
                className="text-area"
                rows={4}
              />
            </Field>
          </div>
        </section>

        {serverMessage ? <div className="form-alert error">{serverMessage}</div> : null}

        {mutation.isSuccess && !serverMessage && isSubmitSuccessful ? (
          <div className="form-alert success">
            Daily log saved. Your dashboard will update from this new entry.
          </div>
        ) : null}

        <div className="form-actions">
          <button
            className="button button-primary"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Saving today's entry..." : "Save daily log"}
          </button>

          <p className="list-note">One check-in per date helps keep the timeline clear.</p>
        </div>
      </form>
    </section>
  );
}
