"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type Pizza = {
  titulo: string;
  desc: string;
  precio?: string;
};

type ContenidoInicio = {
  titulo: string;
  frase: string;
  descripcion: string;
};

type ContenidoUbicacion = {
  coordenadas: string;
  horario: string;
};

type ContenidoContacto = {
  whatsapp: string;
  telefono: string;
};



const inicioPorDefecto: ContenidoInicio = {
  titulo: "PIZZERÍA JEYMI",
  frase: "Sabor que se disfruta en cada rebanada",
  descripcion:
    "Pizzas preparadas con ingredientes de calidad, mucho sabor y el toque especial de nuestra casa.",
};

const serviciosPorDefecto: Pizza[] = [
  {
    titulo: "Pizza de Pepperoni",
    desc: "Clásica, deliciosa y preparada con abundante pepperoni y queso.",
  },
  {
    titulo: "Pizza Hawaiana",
    desc: "La combinación perfecta de jamón, piña y queso para disfrutar en cada mordida.",
  },
  {
    titulo: "Pizza Cuatro Quesos",
    desc: "Una mezcla cremosa de quesos seleccionados para los amantes del queso.",
  },
  {
    titulo: "Pizza Mexicana",
    desc: "Con ingredientes llenos de sabor para quienes disfrutan una pizza con carácter.",
  },
  {
    titulo: "Pizza Especial de la Casa",
    desc: "Nuestra especialidad preparada con la combinación favorita de la casa.",
  },
  {
    titulo: "Pedidos y atención",
    desc: "Elige tus ingredientes favoritos y disfruta una pizza hecha a tu manera.",
  },
];

type Paquete = {
  titulo: string;
  descripcion: string;
  precio: string;
};

const paquetesDestacados: Paquete[] = [
  {
    titulo: "Paquete 7",
    descripcion:
      "Paquete 7: 3 pizzas jumbo de cualquier combinación + 1 refresco de 2 L. \n\n por mitad y mitad tiene un costo extra por pizza.",
    precio: "$590",
  },
  {
    titulo: "Paquete 8",
    descripcion:
      "Paquete 8: 3 pizzas medianas de cualquier combinación + 1 refresco de 2 L.\n\n por mitad y mitad tiene un costo extra por pizza.",
    precio: "$330",
  },
  {
    titulo: "Pizza rectangular",
    descripcion:
      "Pizza rectangura de 4 combinaciones, con orilla de queso crema y ajonjoli, + 1 refesco de 2 L.",
    precio: "$365",
  },
];

const ubicacionPorDefecto: ContenidoUbicacion = {
  coordenadas: "19.480271, -98.818845",
  horario: "Próximamente agregaremos nuestros horarios.",
};

const contactoPorDefecto: ContenidoContacto = {
  whatsapp: "525624771365",
  telefono: "525624771365",
};

export default function Home() {

  // ==============================
  // CONTENIDO DESDE SUPABASE
  // ==============================

  const [tituloInicio, setTituloInicio] = useState(
    inicioPorDefecto.titulo
  );

  const [fraseInicio, setFraseInicio] = useState(
    inicioPorDefecto.frase
  );

  const [descripcionInicio, setDescripcionInicio] = useState(
    inicioPorDefecto.descripcion
  );

  const [servicios, setPizzas] = useState<Pizza[]>(
    serviciosPorDefecto
  );

  const [nosotrosTexto, setNosotrosTexto] = useState(
    "En Pizzería JEYMI nos enfocamos en preparar pizzas y paquetes con ingredientes de calidad, buen sabor y una atención cercana para que disfrutes cada pedido."
  );

  const [fotosGaleria, setFotosGaleria] = useState<string[]>([]);

  const [coordenadas, setCoordenadas] = useState(
    ubicacionPorDefecto.coordenadas
  );

  const [horarioUbicacion, setHorarioUbicacion] = useState(
    ubicacionPorDefecto.horario
  );

  const [whatsappContacto, setWhatsappContacto] = useState(
    contactoPorDefecto.whatsapp
  );

  const [telefonoContacto, setTelefonoContacto] = useState(
    contactoPorDefecto.telefono
  );

  const [cargandoContenido, setCargandoContenido] = useState(true);

  // ==============================
  // CARGAR TODO DESDE SUPABASE
  // ==============================

  useEffect(() => {
    let activo = true;

    const cargarContenido = async () => {
      const supabase = createClient();

      try {
        // ==========================
        // SITE CONTENT
        // ==========================

        const { data, error } = await supabase
          .from("site_content")
          .select(
            "id, inicio, servicios, nosotros, galeria, ubicacion, contacto"
          )
          .eq("id", 1)
          .single();

        if (error) {
  console.error("Error al guardar el pedido:", {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });

  setMensajeCita(
    error.message || "No se pudo registrar el pedido."
  );

  return;
}

        if (data && activo) {
          // ==========================
          // INICIO
          // ==========================

          const inicio =
            data.inicio as Partial<ContenidoInicio> | null;

          if (inicio) {
            setTituloInicio(
              inicio.titulo || inicioPorDefecto.titulo
            );

            setFraseInicio(
              inicio.frase || inicioPorDefecto.frase
            );

            setDescripcionInicio(
              inicio.descripcion ||
                inicioPorDefecto.descripcion
            );
          }

          // ==========================
          // SERVICIOS
          // ==========================

          if (Array.isArray(data.servicios)) {
            setPizzas(data.servicios as Pizza[]);
          }

          // ==========================
          // NOSOTROS
          // ==========================

          if (typeof data.nosotros === "string") {
            setNosotrosTexto(data.nosotros);
          }

          // ==========================
          // GALERÍA
          // ==========================

          if (Array.isArray(data.galeria)) {
            setFotosGaleria(data.galeria as string[]);
          }

          // ==========================
          // UBICACIÓN
          // ==========================

          const ubicacion =
            data.ubicacion as Partial<ContenidoUbicacion> | null;

          if (ubicacion) {
            setCoordenadas(
              ubicacion.coordenadas ||
                ubicacionPorDefecto.coordenadas
            );

            setHorarioUbicacion(
              ubicacion.horario ||
                ubicacionPorDefecto.horario
            );
          }

          // ==========================
          // CONTACTO
          // ==========================

          const contacto =
            data.contacto as Partial<ContenidoContacto> | null;

          if (contacto) {
            setWhatsappContacto(
              contacto.whatsapp ||
                contactoPorDefecto.whatsapp
            );

            setTelefonoContacto(
              contacto.telefono ||
                contactoPorDefecto.telefono
            );
          }
        }
      } catch (error) {
        console.error(
          "Error inesperado al cargar Supabase:",
          error
        );
      } finally {
        if (activo) {
          setCargandoContenido(false);
        }
      }
    };

    cargarContenido();

    return () => {
      activo = false;
    };
  }, []);

  // ==============================
  // MENU MOVIL
  // ==============================

  const cerrarMenu = () => {
    const menu = document.getElementById(
      "mobile-menu"
    ) as HTMLInputElement | null;

    if (menu) {
      menu.checked = false;
    }
  };

  // ==============================
  // DATOS DEL FORMULARIO
  // ==============================

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setPizza] = useState("");
  const [motivo, setMotivo] = useState("");

  const [enviandoCita, setEnviandoCita] = useState(false);
  const [mensajeCita, setMensajeCita] = useState("");

  // ==============================
  // NUMEROS LIMPIOS
  // ==============================

  const whatsappNumero =
    whatsappContacto.replace(/\D/g, "");

  const telefonoNumero =
    telefonoContacto.replace(/\D/g, "");

  // ==============================
  // COORDENADAS
  // ==============================

  const partesCoordenadas = coordenadas
    .split(",")
    .map((valor) => valor.trim());

  const latitud =
    partesCoordenadas[0] ||
    "19.480271";

  const longitud =
    partesCoordenadas[1] ||
    "-98.818845";

  const destinoMapa = `${latitud},${longitud}`;

  // ==============================
  // SOLICITAR CITA
  // ==============================

  const solicitarCita = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const supabase = createClient();

    if (enviandoCita) {
      return;
    }

    setMensajeCita("");

    if (
      !nombre.trim() ||
      !telefono.trim() ||
      !servicio
    ) {
      setMensajeCita(
        "Por favor completa todos los campos obligatorios."
      );

      return;
    }

    try {
      setEnviandoCita(true);

      // ==========================
      // GUARDAR EN SUPABASE
      // ==========================

      const { error } = await supabase
        .from("citas")
        .insert({
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          servicio: servicio.trim(),
          motivo: motivo.trim(),
          estado: "pendiente",
        });

      if (error) {
        console.error(
          "Error al guardar la cita:",
          error
        );

        if (error.code === "23505") {
          setMensajeCita(
            "⚠️ No se pudo registrar el pedido. Inténtalo nuevamente."
          );
        } else {
          setMensajeCita(
            "No se pudo registrar la cita. Inténtalo nuevamente."
          );
        }

        return;
      }

      // ==========================
      // MENSAJE DE WHATSAPP
      // ==========================

      const lineas = [
        "Hola, quiero solicitar un pedido de favor:.",
        "",
        `*Nombre:* ${nombre.trim()}`,
        `*Teléfono / WhatsApp:* ${telefono.trim()}`,
        `*Pizza:* ${servicio}`,
        `*Detalles del pedido:* ${
          motivo.trim() || "No especificado"
        }`,
        "",
        "Espero el tiempo en que llegaria mi pedido. Muchas gracias.",
      ];

      const mensajeTexto =
        lineas.join("\n");

      setMensajeCita(
        "¡Pedido registrado correctamente! Abriendo WhatsApp..."
      );

      // ==========================
      // ABRIR WHATSAPP
      // ==========================

      if (whatsappNumero) {
        const esMovil =
          /Android|iPhone|iPad|iPod|Mobile/i.test(
            navigator.userAgent
          );

        const url = esMovil
          ? `https://api.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(
              mensajeTexto
            )}`
          : `https://web.whatsapp.com/send?phone=${whatsappNumero}&text=${encodeURIComponent(
              mensajeTexto
            )}`;

        if (esMovil) {
          window.location.href = url;
        } else {
          window.open(url, "_blank");
        }
      }

      // ==========================
      // LIMPIAR FORMULARIO
      // ==========================

      setNombre("");
      setTelefono("");
      setPizza("");
      setMotivo("");
    } catch (error) {
      console.error(
        "Error inesperado al solicitar cita:",
        error
      );

      setMensajeCita(
        "Ocurrió un error inesperado. Inténtalo nuevamente."
      );
    } finally {
      setEnviandoCita(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900"
      style={{
        backgroundImage: "url('/fondo1.jpg')",
      }}
    >
      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#inicio"
            className="text-2xl font-bold text-red-600"
          >
            JEYMI PIZZAS
          </a>

          <div className="hidden md:flex items-center gap-7 font-semibold">
            <a
              href="#inicio"
              className="hover:text-red-600 transition"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="hover:text-red-600 transition"
            >
              menu
            </a>

            <a
              href="#nosotros"
              className="hover:text-red-600 transition"
            >
              Nosotros
            </a>

            <a
              href="#galeria"
              className="hover:text-red-600 transition"
            >
              Galería
            </a>

            <a
              href="#ubicacion"
              className="hover:text-red-600 transition"
            >
              Ubicación
            </a>

            <a
              href="#contacto"
              className="hover:text-red-600 transition"
            >
              Contacto
            </a>

            <a
              href="#cita"
              className="px-5 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-sm"
            >
              Ordenar
            </a>
          </div>

          <div className="md:hidden">
            <input
              type="checkbox"
              id="mobile-menu"
              className="peer hidden"
            />

            <label
              htmlFor="mobile-menu"
              className="cursor-pointer block text-3xl font-bold text-red-600 select-none"
            >
              <span className="peer-checked:hidden">
                ☰
              </span>

              <span className="hidden peer-checked:inline">
                ✕
              </span>
            </label>

            <div className="hidden peer-checked:block absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg">
              <div className="flex flex-col">
                <a
                  href="#inicio"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Inicio
                </a>

                <a
                  href="#servicios"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Pizzas
                </a>

                <a
                  href="#nosotros"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Nosotros
                </a>

                <a
                  href="#galeria"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Galería
                </a>

                <a
                  href="#ubicacion"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Ubicación
                </a>

                <a
                  href="#contacto"
                  onClick={cerrarMenu}
                  className="px-7 py-5 text-lg font-semibold border-b border-gray-100 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Contacto
                </a>

                <div className="p-5">
                  <a
                    href="#cita"
                    onClick={cerrarMenu}
                    className="block w-full py-4 rounded-full bg-red-600 text-white text-center font-bold text-lg hover:bg-red-700 transition shadow-md"
                  >
                    Ordenar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================================= */}
      {/* INICIO */}
      {/* ================================= */}

      <section
        id="inicio"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white/70 pt-24"
      >
        <p className="text-red-600 font-semibold mb-3">
          {fraseInicio}
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {tituloInicio}
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
          {descripcionInicio}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#cita"
            className="px-8 py-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md transition"
          >
            Ordenar
          </a>

          <a
            href="#servicios"
            className="px-8 py-4 rounded-full border-2 border-red-600 text-red-600 font-semibold hover:bg-red-100 transition"
          >
            Ver menú
          </a>
        </div>
      </section>

      {/* ================================= */}
      {/* SERVICIOS */}
      {/* ================================= */}

      <section
        id="servicios"
        className="py-24 px-6 bg-white/90"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold mb-2">
              Nuestro menú
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Nuestras pizzas
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600">
              Tenemos pizzas y paquetes para compartir,
              con diferentes combinaciones para disfrutar
              en cualquier ocasión.
            </p>
          </div>

          {cargandoContenido ? (
            <div className="text-center text-gray-400 py-10">
              Cargando servicios...
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicios.map(
                (servicioItem, index) => {
                  const iconos = [
                    "🍕 🥤",
                    "🍕",
                    "🍕",
                    "🍕",
                    "🍕",
                    "🍕",
                    "🍕",
                    "🍕",
                  ];

                  return (
                    <div
                      key={`${servicioItem.titulo}-${index}`}
                      className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                        <span className="text-2xl">
                          {iconos[index % iconos.length]}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3">
                        {servicioItem.titulo}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {servicioItem.desc}
                      </p>

                      {servicioItem.precio && (
                        <p className="text-red-600 font-bold mt-4">
                          {servicioItem.precio}
                        </p>
                      )}

                      <a
                        href="#cita"
                        className="inline-block mt-6 text-red-600 font-semibold hover:text-red-700"
                      >
                        Ordenar →
                      </a>
                    </div>
                  );
                }
              )}

              {/* LOS 3 PAQUETES VAN DENTRO DEL MISMO MENÚ */}
              {paquetesDestacados.map((paquete, index) => (
                <div
                  key={`${paquete.titulo}-${index}`}
                  className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border border-red-100"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                    <span className="text-2xl">🍕📦</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {paquete.titulo}
                  </h3>

                  <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                    {paquete.descripcion}
                  </p>

                  <p className="text-red-600 font-bold mt-4">
                    {paquete.precio}
                  </p>

                  <a
                    href="#cita"
                    className="inline-block mt-6 text-red-600 font-semibold hover:text-red-700"
                  >
                    Ordenar →
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* FOLLETO */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <p className="text-red-600 font-semibold mb-2">
                Menú completo
              </p>
              <h3 className="text-3xl md:text-4xl font-bold">
                Consulta nuestro folleto
              </h3>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-3 md:p-5 overflow-hidden">
              <img
                src="/folleto.jpeg"
                alt="Folleto y menú de Pizzería Husey"
                className="w-full h-auto rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* NOSOTROS */}
      {/* ================================= */}

      <section
        id="nosotros"
        className="py-20 px-6 bg-white/80"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 font-semibold mb-2">
            Conócenos
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Sobre nuestra pizzería
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            {nosotrosTexto}
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* GALERÍA */}
      {/* ================================= */}

      <section
        id="galeria"
        className="py-20 px-6 bg-white/90"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold mb-2">
              Conoce nuestras pizzas
            </p>

            <h2 className="text-4xl font-bold">
              Galería
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fotosGaleria.length > 0 ? (
              fotosGaleria.map(
                (foto, index) => (
                  <div
                    key={`${foto}-${index}`}
                    className="h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-gray-100"
                  >
                    <img
                      src={foto}
                      alt={`Galería ${
                        index + 1
                      }`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )
              )
            ) : (
              <p className="col-span-full text-center text-gray-400 py-8">
                Aún no hay fotos en la galería.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* UBICACIÓN */}
      {/* ================================= */}

      <section
        id="ubicacion"
        className="py-20 px-6 bg-white/80"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold mb-2">
              Encuéntranos
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Nuestra ubicación
            </h2>

            <p className="text-lg text-gray-600">
              Visítanos en nuestra pizzería. Estamos
              listos para preparar tu pedido.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-2xl">
                    📍
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">
                    PIZZAS JEYMI
                  </h3>

                  <p className="text-gray-600">
                    Ubicación de la pizzería
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">
                    📍 Coordenadas
                  </p>

                  <p>{coordenadas}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    🕐 Horario
                  </p>

                  <p>{horarioUbicacion}</p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  destinoMapa
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-8 py-4 rounded-full bg-red-600 text-white text-center font-bold hover:bg-red-700 transition shadow-md"
              >
                🧭 Cómo llegar
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  destinoMapa
                )}&z=17&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Pizzería Husey"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* CONTACTO */}
      {/* ================================= */}

      <section
        id="contacto"
        className="py-20 px-6 bg-white/90"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold mb-2">
              Estamos para atenderte
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Contáctanos
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes alguna duda o quieres realizar un
              pedido? Comunícate directamente con nosotros.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${whatsappNumero}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl shadow-md p-7 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                <span className="text-3xl">
                  💬
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition">
                WhatsApp
              </h3>

              <p className="text-gray-500 text-sm">
                Envíanos un mensaje directamente
              </p>
            </a>

            <a
              href={`tel:+${telefonoNumero}`}
              className="group bg-white rounded-3xl shadow-md p-7 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-5">
                <span className="text-3xl">
                  📞
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition">
                Llamar
              </h3>

              <p className="text-gray-500 text-sm">
                Comunícate directamente con nosotros
              </p>
            </a>
          </div>

          <div className="mt-8 bg-white rounded-3xl shadow-md p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-4">
              <span className="text-2xl">
                🕐
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">
              Horarios
            </h3>

            <p className="text-gray-600 whitespace-pre-line">
              {horarioUbicacion}
            </p>
          </div>
        </div>
      </section>
```

      {/* ================================= */}
      {/* AGENDAR CITA */}
      {/* ================================= */}

      <section
        id="cita"
        className="py-20 px-6 bg-red-600 text-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-semibold mb-2 text-red-100">
              Pedidos y atención
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Haz tu pedido
            </h2>

            <p className="text-lg text-red-50 max-w-2xl mx-auto">
              ¿Se te antoja una buena pizza? 🍕🔥
Tu antojo, nuestra especialidad. Haz tu pedido de forma fácil y disfruta el sabor de una pizza preparada con calidad, dedicación y mucho cariño. ❤️
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 md:p-10">
            <form
              className="space-y-6"
              onSubmit={solicitarCita}
            >
              {/* NOMBRE */}

              <div>
                <label
                  htmlFor="nombre"
                  className="block font-semibold mb-2"
                >
                  Nombre completo
                </label>

                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Escribe tu nombre completo"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              {/* TELEFONO */}

              <div>
                <label
                  htmlFor="telefono"
                  className="block font-semibold mb-2"
                >
                  Teléfono / WhatsApp
                </label>

                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Escribe tu número de teléfono"
                  value={telefono}
                  onChange={(e) =>
                    setTelefono(e.target.value)
                  }
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              {/* SERVICIO */}

              <div>
  <label
    htmlFor="servicio"
    className="block font-semibold mb-2"
  >
    ¿QUÉ DESEAS ORDENAR?
  </label>

  <input
    id="servicio"
    name="servicio"
    type="text"
    value={servicio}
    onChange={(e) =>
      setPizza(e.target.value)
    }
    required
    placeholder="Ejemplo: Quiero el paquete 2 o quiero 2 pizzas grandes"
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
  />
</div>

{/* MOTIVO */}

<div>
  <label
    htmlFor="motivo"
    className="block font-semibold mb-2"
  >
    Detalles del pedido{" "}
    <span className="text-gray-400 font-normal">
      (obligatorio)
    </span>
  </label>

  <textarea
    id="motivo"
    name="motivo"
    rows={4}
    placeholder="indica de que especialidades serian, calle, color del zaguán y fachada, por ingrediente extra o por mitad y mitad tiene un costo extra dependiendo el tamaño..."
    value={motivo}
    onChange={(e) =>
      setMotivo(e.target.value)
    }
    required
    className="w-full px-5 py-4 rounded-2xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
  />
</div>

{/* MENSAJE */}

{mensajeCita && (
  <div
    className={`rounded-2xl p-4 text-center font-semibold ${
      mensajeCita.includes("correctamente")
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {mensajeCita}
  </div>
)}

              {/* BOTON */}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={enviandoCita}
                  className="block w-full bg-red-600 text-white py-4 rounded-xl font-bold text-center hover:bg-red-700 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {enviandoCita
                    ? "Registrando pedido..."
                    : "Realizar pedido por WhatsApp"}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Primero registraremos tu solicitud y
                después se abrirá WhatsApp para enviarla
                directamente a la pizzeria.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <footer className="py-8 px-6 bg-gray-900 text-white text-center">
        <p className="font-semibold">
          PIZZERÍA JEYMI
        </p>

        <p className="text-sm text-gray-400 mt-2">
          © 2026 Todos los derechos reservados.
        </p>

        <a
          href="/login"
          className="inline-block text-sm text-gray-500 hover:text-red-400 transition mt-4"
        >
          Acceso administrativo
        </a>
      </footer>
    </main>
  );
}