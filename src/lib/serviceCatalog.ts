import type { Service } from '@/constants/services';
import { SERVICES } from '@/constants/services';

export async function loadServices(): Promise<Service[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!supabaseUrl || !supabaseAnonKey) {
    return SERVICES;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return SERVICES;
    }

    return data.map((item: Service) => ({
      ...item,
      price: Number(item.price),
      duration: Number(item.duration),
    }));
  } catch {
    return SERVICES;
  }
}
