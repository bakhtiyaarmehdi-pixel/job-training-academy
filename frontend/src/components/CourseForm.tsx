import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import type { Course } from '../backend';
import { useCreateCourse, useUpdateCourse } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CourseFormProps {
  course?: Course | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  syllabus: string[];
  trainerName: string;
  trainerBio: string;
  batchTimings: string;
  fees: string;
  zoomLink: string;
}

const emptyForm: FormState = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  syllabus: [''],
  trainerName: '',
  trainerBio: '',
  batchTimings: '',
  fees: '',
  zoomLink: '',
};

export default function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title,
        shortDescription: course.shortDescription,
        fullDescription: course.fullDescription,
        syllabus: course.syllabus.length > 0 ? [...course.syllabus] : [''],
        trainerName: course.trainerName,
        trainerBio: course.trainerBio,
        batchTimings: course.batchTimings,
        fees: course.fees.toString(),
        zoomLink: course.zoomLink,
      });
    } else {
      setForm(emptyForm);
    }
  }, [course]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!form.fullDescription.trim()) newErrors.fullDescription = 'Full description is required';
    if (!form.trainerName.trim()) newErrors.trainerName = 'Trainer name is required';
    if (!form.batchTimings.trim()) newErrors.batchTimings = 'Batch timings are required';
    if (!form.fees.trim() || isNaN(Number(form.fees)) || Number(form.fees) < 0) {
      newErrors.fees = 'Valid fees amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSyllabusChange = (idx: number, value: string) => {
    const updated = [...form.syllabus];
    updated[idx] = value;
    setForm({ ...form, syllabus: updated });
  };

  const addSyllabusItem = () => setForm({ ...form, syllabus: [...form.syllabus, ''] });

  const removeSyllabusItem = (idx: number) => {
    if (form.syllabus.length <= 1) return;
    setForm({ ...form, syllabus: form.syllabus.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanSyllabus = form.syllabus.filter((s) => s.trim() !== '');
    const payload = {
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      syllabus: cleanSyllabus,
      trainerName: form.trainerName.trim(),
      trainerBio: form.trainerBio.trim(),
      batchTimings: form.batchTimings.trim(),
      fees: BigInt(Math.round(Number(form.fees))),
      zoomLink: form.zoomLink.trim(),
    };

    try {
      if (course) {
        await updateCourse.mutateAsync({ courseId: course.id, ...payload });
      } else {
        await createCourse.mutateAsync(payload);
      }
      onSuccess();
    } catch {
      // error handled by mutation state
    }
  };

  const isPending = createCourse.isPending || updateCourse.isPending;
  const mutationError = createCourse.error || updateCourse.error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Label className="text-navy font-medium mb-1.5 block">
            Course Title <span className="text-destructive">*</span>
          </Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Full Stack Web Development"
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <Label className="text-navy font-medium mb-1.5 block">
            Short Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            placeholder="Brief overview shown on course cards (2-3 sentences)"
            rows={2}
            className={errors.shortDescription ? 'border-destructive' : ''}
          />
          {errors.shortDescription && <p className="text-destructive text-xs mt-1">{errors.shortDescription}</p>}
        </div>

        <div className="md:col-span-2">
          <Label className="text-navy font-medium mb-1.5 block">
            Full Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            placeholder="Detailed course description for the course detail page"
            rows={4}
            className={errors.fullDescription ? 'border-destructive' : ''}
          />
          {errors.fullDescription && <p className="text-destructive text-xs mt-1">{errors.fullDescription}</p>}
        </div>

        <div>
          <Label className="text-navy font-medium mb-1.5 block">
            Trainer Name <span className="text-destructive">*</span>
          </Label>
          <Input
            value={form.trainerName}
            onChange={(e) => setForm({ ...form, trainerName: e.target.value })}
            placeholder="e.g. Rajesh Kumar"
            className={errors.trainerName ? 'border-destructive' : ''}
          />
          {errors.trainerName && <p className="text-destructive text-xs mt-1">{errors.trainerName}</p>}
        </div>

        <div>
          <Label className="text-navy font-medium mb-1.5 block">Trainer Bio</Label>
          <Input
            value={form.trainerBio}
            onChange={(e) => setForm({ ...form, trainerBio: e.target.value })}
            placeholder="Brief trainer background"
          />
        </div>

        <div>
          <Label className="text-navy font-medium mb-1.5 block">
            Batch Timings <span className="text-destructive">*</span>
          </Label>
          <Input
            value={form.batchTimings}
            onChange={(e) => setForm({ ...form, batchTimings: e.target.value })}
            placeholder="e.g. Mon-Fri, 7:00 PM - 9:00 PM"
            className={errors.batchTimings ? 'border-destructive' : ''}
          />
          {errors.batchTimings && <p className="text-destructive text-xs mt-1">{errors.batchTimings}</p>}
        </div>

        <div>
          <Label className="text-navy font-medium mb-1.5 block">
            Fees (₹) <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            min="0"
            value={form.fees}
            onChange={(e) => setForm({ ...form, fees: e.target.value })}
            placeholder="e.g. 15000"
            className={errors.fees ? 'border-destructive' : ''}
          />
          {errors.fees && <p className="text-destructive text-xs mt-1">{errors.fees}</p>}
        </div>

        <div className="md:col-span-2">
          <Label className="text-navy font-medium mb-1.5 block">Zoom Meeting Link</Label>
          <Input
            type="url"
            value={form.zoomLink}
            onChange={(e) => setForm({ ...form, zoomLink: e.target.value })}
            placeholder="https://zoom.us/j/..."
          />
        </div>
      </div>

      {/* Syllabus */}
      <div>
        <Label className="text-navy font-medium mb-2 block">Course Syllabus</Label>
        <div className="space-y-2">
          {form.syllabus.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="flex-shrink-0 w-7 h-9 flex items-center justify-center text-grey-dark text-sm font-medium">
                {idx + 1}.
              </span>
              <Input
                value={item}
                onChange={(e) => handleSyllabusChange(idx, e.target.value)}
                placeholder={`Topic ${idx + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSyllabusItem(idx)}
                disabled={form.syllabus.length <= 1}
                className="flex-shrink-0 text-grey-dark hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSyllabusItem}
          className="mt-2 text-navy border-navy hover:bg-navy hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Topic
        </Button>
      </div>

      {mutationError && (
        <p className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md">
          {mutationError.message}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-navy hover:bg-navy-dark text-white font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            course ? 'Update Course' : 'Create Course'
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
