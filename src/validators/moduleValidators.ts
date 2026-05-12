import { z } from 'zod';
import { objectIdSchema } from './commonValidators';

const paramsWithId = z.object({ id: objectIdSchema });

export const customerCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    phone: z.string().min(6),
    email: z.string().email().optional().or(z.literal('')),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
    membershipId: objectIdSchema.optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const customerUpdateSchema = z.object({
  body: customerCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const vehicleCreateSchema = z.object({
  body: z.object({
    customerId: objectIdSchema,
    model: z.string().min(1),
    numberPlate: z.string().min(1),
    type: z.string().min(1),
    color: z.string().min(1)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const vehicleUpdateSchema = z.object({
  body: vehicleCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const appointmentCreateSchema = z.object({
  body: z.object({
    customerId: objectIdSchema,
    vehicleId: objectIdSchema,
    date: z.string().datetime(),
    timeSlot: z.string().min(1),
    status: z.enum(['scheduled', 'in-progress', 'completed', 'cancelled']).optional(),
    staffId: objectIdSchema.optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const appointmentUpdateSchema = z.object({
  body: appointmentCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

const lineItemSchema = z.object({
  serviceId: objectIdSchema,
  name: z.string().min(1),
  price: z.number().min(0)
});

export const jobCardCreateSchema = z.object({
  body: z.object({
    appointmentId: objectIdSchema,
    services: z.union([z.array(lineItemSchema).min(1), z.string().min(2)]),
    status: z.enum(['open', 'in-progress', 'completed']).optional(),
    notes: z.string().optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const jobCardUpdateSchema = z.object({
  body: z.object({
    appointmentId: objectIdSchema.optional(),
    services: z.union([z.array(lineItemSchema), z.string().min(2)]).optional(),
    status: z.enum(['open', 'in-progress', 'completed']).optional(),
    notes: z.string().optional()
  }),
  params: paramsWithId,
  query: z.object({}).optional()
});

const invoiceServiceSchema = z.object({
  serviceId: objectIdSchema,
  name: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().int().min(1)
});

export const invoiceCreateSchema = z.object({
  body: z.object({
    customerId: objectIdSchema,
    services: z.array(invoiceServiceSchema).min(1),
    discount: z.number().min(0).optional(),
    paymentStatus: z.enum(['pending', 'paid', 'partial']).optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const invoiceUpdateSchema = z.object({
  body: invoiceCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const serviceCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    basePrice: z.number().min(0),
    vehicleTypePricing: z.array(
      z.object({
        vehicleType: z.string().min(1),
        price: z.number().min(0)
      })
    )
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const serviceUpdateSchema = z.object({
  body: serviceCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const staffCreateSchema = z.object({
  body: z.object({
    userId: objectIdSchema.optional(),
    name: z.string().min(2),
    role: z.enum(['admin', 'staff']),
    phone: z.string().min(6),
    email: z.string().email()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const staffUpdateSchema = z.object({
  body: staffCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const inventoryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    quantity: z.number().min(0),
    threshold: z.number().min(0)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const inventoryUpdateSchema = z.object({
  body: inventoryCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const feedbackCreateSchema = z.object({
  body: z.object({
    customerId: objectIdSchema,
    rating: z.number().min(1).max(5),
    review: z.string().optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const feedbackUpdateSchema = z.object({
  body: feedbackCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const membershipCreateSchema = z.object({
  body: z.object({
    planName: z.string().min(1),
    validity: z.number().int().min(1),
    usageLimit: z.number().int().min(1)
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

export const membershipUpdateSchema = z.object({
  body: membershipCreateSchema.shape.body.partial(),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const notificationUpdateSchema = z.object({
  body: z.object({
    type: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    message: z.string().min(1).optional(),
    relatedCustomerId: objectIdSchema.optional(),
    relatedAppointmentId: objectIdSchema.optional(),
    read: z.boolean().optional()
  }),
  params: paramsWithId,
  query: z.object({}).optional()
});

export const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: paramsWithId,
  query: z.object({}).optional()
});
