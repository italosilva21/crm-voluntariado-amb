import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefone, area_interesse, habilidades, disponibilidade } = body;

    if (!nome || !email || !area_interesse) {
      return NextResponse.json(
        { error: 'Nome, email e área de interesse são obrigatórios.' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('voluntarios')
      .insert([
        { nome, email, telefone, area_interesse, habilidades, disponibilidade }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Erro interno:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
