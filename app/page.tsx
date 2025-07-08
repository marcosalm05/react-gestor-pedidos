"use client"

import { useState } from "react"
import { ShoppingCart, Search, User, Plus, Minus, X, Package, Truck, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
interface Product {
  pro_codigo: number
  pre_descripcion?: string
  ppc_cantxpresentacion?: number
  pro_balanzaconf?:number
  pro_entrega_vehichulo?: number
  pro_codori: string
  pro_detalle: string
  pro_ubicacion?: number
  prov_descr?:string
  pro_minimo?: number
  pro_categoria?: number
  pro_iva?: number
  pro_conpro?: number
  pro_valcopro?:number
  pro_valporce?: number
  pro_venta1:number
  pro_coststo?:number
  pro_venta2?:number
  pro_venta3?:number
  pro_venta4?:number
  sto_cantidad?:number //Este vamos a mostrar
  sto_vencimiento?:string
  sto_lote?: string
  cat_descri: string
  ub_descri?: string
  pro_activarsaltoprecio2normal?: boolean
  pro_activarsaltoprecio3normal?: boolean
  pro_cantidadsaltoprecio2normal?: number
  pro_cantidadsaltoprecio3normal?: number
  pro_cantidadsaltoprecio4normal?: number
  image?: string
}
interface CartItem extends Product {
  quantity: number
}

const mockProducts: Product[] = [
  {
    pro_codigo: 1,
    pro_detalle: "Smartphone Galaxy Pro",
    pro_codori: "SGP001",
    cat_descri: "Electrónicos",
    pro_venta1: 299.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    pro_codigo: 2,
    pro_detalle: "Laptop Gaming Elite",
    pro_codori: "LGE002",
    cat_descri: "Computadoras",
    pro_venta1: 899.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    pro_codigo: 3,
    pro_detalle: "Auriculares Premium",
    pro_codori: "APR003",
    cat_descri: "Audio",
    pro_venta1: 79.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    pro_codigo: 4,
    pro_detalle: "Tablet Ultra 12''",
    pro_codori: "TUL004",
    cat_descri: "Electrónicos",
    pro_venta1: 249.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    pro_codigo: 5,
    pro_detalle: "Smartwatch Sport",
    pro_codori: "SWS005",
    cat_descri: "Wearables",
    pro_venta1: 199.99,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    pro_codigo: 6,
    pro_detalle: "Cámara Profesional",
    pro_codori: "CPR006",
    cat_descri: "Fotografía",
    pro_venta1: 449.99,
    image: "/placeholder.svg?height=250&width=250",
  },
]

const categories = ["Todos", "Electrónicos", "Computadoras", "Audio", "Wearables", "Fotografía"]

export default function EcommercePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLogo, setSelectedLogo] = useState(1)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    ci: "",
    email: "",
    whatsapp: "",
    observations: "",
    deliveryMethod: "",
  })

  const filteredProducts = mockProducts.filter((product) => {
    const categoryMatch = selectedCategory === "Todos" || product.cat_descri === selectedCategory
    const searchMatch =
      product.pro_detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.pro_codori.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && searchMatch
  })

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.pro_codigo === product.pro_codigo)
      if (existing) {
        return prev.map((item) => (item.pro_codigo === product.pro_codigo ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((item) => (item.pro_codigo === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.pro_codigo !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.pro_venta1 * item.quantity, 0)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleSubmitOrder = () => {
    console.log("Orden enviada:", { cart, form: checkoutForm })
    alert("¡Orden enviada exitosamente!")
    setIsCheckoutOpen(false)
    setCart([])
    setCheckoutForm({
      firstName: "",
      lastName: "",
      ci: "",
      email: "",
      whatsapp: "",
      observations: "",
      deliveryMethod: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Azul */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-8 w-8" />
                <span className="text-2xl font-bold">MiShop</span>
              </div>
            </div>

            {/* Navegación */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-blue-200 transition-colors">
                La Empresa
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Productos
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Novedades
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Contacto
              </a>
            </nav>

            {/* Barra de búsqueda y usuario */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-white text-gray-900 border-0 rounded-full pl-4 pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtros - Sidebar Izquierdo */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-800 font-bold">Categorías</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-3">
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor={category}
                        className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Promociones */}
            <Card className="mt-6 shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">¡Ofertas Especiales!</h3>
                <p className="text-blue-100 text-sm">Descuentos de hasta 30% en productos seleccionados</p>
              </CardContent>
            </Card>
          </div>

          {/* Productos - Centro */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.pro_codigo} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.pro_detalle}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">{product.cat_descri}</Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-lg text-gray-800">{product.pro_detalle}</h3>
                      <p className="text-sm text-gray-600">Código: {product.pro_codori}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">${product.pro_venta1}</span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Carrito - Sidebar Derecho */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg border-0">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <ShoppingCart className="h-5 w-5" />
                  Carrito ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.map((item) => (
                        <div key={item.pro_codigo} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm text-gray-800">{item.pro_detalle}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.pro_codigo)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">Código: {item.pro_codori}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.pro_codigo, item.quantity - 1)}
                                className="h-8 w-8 p-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.pro_codigo, item.quantity + 1)}
                                className="h-8 w-8 p-0 border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-bold text-blue-600">${(item.pro_venta1 * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                        size="lg"
                      >
                        Finalizar Compra
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
            
          {/* Diseños de Logo */}
          <div className="lg:col-span-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-800 mb-2">Diseños de Logo</h1>
              <h2 className="text-2xl text-blue-600">Juguetería Daniel</h2>
              <p className="text-gray-600 mt-2">Selecciona el diseño que más te guste</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Logo 1: Corona en la D */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 1 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(1)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 1: Corona en la D</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="mb-4">
                    {/* Juguetería */}
                    <text
                      x="100"
                      y="25"
                      textAnchor="middle"
                      className="fill-blue-600 text-lg font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                    >
                      JUGUETERÍA
                    </text>

                    {/* Daniel con corona en D */}
                    <g>
                      {/* Corona sobre la D */}
                      <path
                        d="M 25 45 L 30 35 L 35 40 L 40 35 L 45 40 L 50 35 L 55 45 Z"
                        fill="#FFD700"
                        stroke="#FFA500"
                        strokeWidth="1"
                      />
                      <circle cx="30" cy="38" r="1.5" fill="#FF6B6B" />
                      <circle cx="40" cy="38" r="1.5" fill="#4CAF50" />
                      <circle cx="50" cy="38" r="1.5" fill="#FF6B6B" />

                      {/* Letra D estilizada */}
                      <path
                        d="M 25 50 L 25 85 L 45 85 C 55 85 60 75 60 67.5 C 60 60 55 50 45 50 Z"
                        fill="#2A5CAA"
                        stroke="#1E3A8A"
                        strokeWidth="1"
                      />

                      {/* Resto de ANIEL */}
                      <text
                        x="70"
                        y="75"
                        className="fill-blue-700 font-bold"
                        style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}
                      >
                        ANIEL
                      </text>
                    </g>

                    {/* Juguetes decorativos */}
                    <circle cx="160" cy="60" r="8" fill="#FF6B6B" opacity="0.7" />
                    <rect x="170" y="70" width="12" height="12" fill="#4CAF50" opacity="0.7" rx="2" />
                    <polygon points="185,65 190,75 180,75" fill="#FFD700" opacity="0.7" />
                  </svg>
                  {selectedLogo === 1 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>

              {/* Logo 2: Corona sobre la i */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 2 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(2)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 2: Corona en la i</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="mb-4">
                    {/* Juguetería con corona en i */}
                    <text
                      x="100"
                      y="25"
                      textAnchor="middle"
                      className="fill-blue-600 text-lg font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                    >
                      JUGUETER
                    </text>

                    {/* Corona sobre la i */}
                    <path
                      d="M 140 8 L 143 3 L 146 6 L 149 3 L 152 6 L 155 3 L 158 8 Z"
                      fill="#FFD700"
                      stroke="#FFA500"
                      strokeWidth="0.5"
                    />
                    <circle cx="143" cy="5" r="0.8" fill="#FF6B6B" />
                    <circle cx="149" cy="5" r="0.8" fill="#4CAF50" />
                    <circle cx="155" cy="5" r="0.8" fill="#FF6B6B" />

                    {/* Letra i */}
                    <rect x="147" y="12" width="4" height="15" fill="#2A5CAA" />

                    {/* A final */}
                    <text
                      x="160"
                      y="25"
                      className="fill-blue-600 text-lg font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                    >
                      A
                    </text>

                    {/* Daniel */}
                    <text
                      x="100"
                      y="65"
                      textAnchor="middle"
                      className="fill-blue-700 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "28px" }}
                    >
                      DANIEL
                    </text>

                    {/* Juguetes decorativos */}
                    <circle cx="30" cy="80" r="6" fill="#FF6B6B" opacity="0.8" />
                    <rect x="40" y="85" width="8" height="8" fill="#4CAF50" opacity="0.8" rx="1" />
                    <circle cx="170" cy="80" r="6" fill="#FFD700" opacity="0.8" />
                  </svg>
                  {selectedLogo === 2 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>

              {/* Logo 3: Logo Horizontal */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 3 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(3)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 3: Horizontal</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="220" height="100" viewBox="0 0 220 100" className="mb-4">
                    {/* Corona principal */}
                    <path
                      d="M 15 25 L 22 10 L 29 18 L 36 10 L 43 18 L 50 10 L 57 25 Z"
                      fill="#FFD700"
                      stroke="#FFA500"
                      strokeWidth="1"
                    />
                    <circle cx="22" cy="15" r="2" fill="#FF6B6B" />
                    <circle cx="36" cy="15" r="2" fill="#4CAF50" />
                    <circle cx="50" cy="15" r="2" fill="#FF6B6B" />

                    {/* Juguetería */}
                    <text
                      x="80"
                      y="25"
                      className="fill-blue-600 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
                    >
                      JUGUETERÍA
                    </text>

                    {/* Daniel */}
                    <text
                      x="80"
                      y="55"
                      className="fill-blue-700 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}
                    >
                      DANIEL
                    </text>

                    {/* Juguetes alrededor */}
                    <g opacity="0.7">
                      <circle cx="200" cy="20" r="8" fill="#FF6B6B" />
                      <rect x="185" y="35" width="12" height="12" fill="#4CAF50" rx="2" />
                      <polygon points="15,70 25,85 5,85" fill="#FFD700" />
                      <circle cx="200" cy="60" r="6" fill="#2A5CAA" />
                    </g>
                  </svg>
                  {selectedLogo === 3 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>

              {/* Logo 4: Circular */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 4 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(4)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 4: Circular</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="180" height="180" viewBox="0 0 180 180" className="mb-4">
                    {/* Círculo exterior */}
                    <circle cx="90" cy="90" r="85" fill="none" stroke="#2A5CAA" strokeWidth="4" />

                    {/* Corona central */}
                    <path
                      d="M 70 70 L 75 55 L 80 65 L 85 55 L 90 65 L 95 55 L 100 65 L 105 55 L 110 70 Z"
                      fill="#FFD700"
                      stroke="#FFA500"
                      strokeWidth="1"
                    />
                    <circle cx="75" cy="60" r="2" fill="#FF6B6B" />
                    <circle cx="85" cy="60" r="2" fill="#4CAF50" />
                    <circle cx="95" cy="60" r="2" fill="#FF6B6B" />
                    <circle cx="105" cy="60" r="2" fill="#4CAF50" />

                    {/* Juguete central */}
                    <rect x="82" y="75" width="16" height="16" fill="#FF6B6B" rx="3" />
                    <circle cx="90" cy="83" r="3" fill="white" />

                    {/* Texto curvo superior */}
                    <path id="circle-top" d="M 30 90 A 60 60 0 0 1 150 90" fill="none" />
                    <text
                      className="fill-blue-600 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
                    >
                      <textPath href="#circle-top" startOffset="50%" textAnchor="middle">
                        JUGUETERÍA
                      </textPath>
                    </text>

                    {/* Texto curvo inferior */}
                    <path id="circle-bottom" d="M 150 90 A 60 60 0 0 1 30 90" fill="none" />
                    <text
                      className="fill-blue-700 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
                    >
                      <textPath href="#circle-bottom" startOffset="50%" textAnchor="middle">
                        DANIEL
                      </textPath>
                    </text>

                    {/* Juguetes decorativos */}
                    <circle cx="45" cy="45" r="4" fill="#4CAF50" opacity="0.8" />
                    <rect x="130" y="40" width="8" height="8" fill="#FFD700" opacity="0.8" rx="1" />
                    <circle cx="135" cy="135" r="4" fill="#FF6B6B" opacity="0.8" />
                    <polygon points="40,135 48,145 32,145" fill="#2A5CAA" opacity="0.8" />
                  </svg>
                  {selectedLogo === 4 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>

              {/* Logo 5: Moderno con Bloques */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 5 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(5)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 5: Bloques Modernos</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="mb-4">
                    {/* Bloques de construcción formando corona */}
                    <rect x="20" y="30" width="15" height="15" fill="#FFD700" rx="2" />
                    <rect x="40" y="20" width="15" height="15" fill="#FF6B6B" rx="2" />
                    <rect x="60" y="25" width="15" height="15" fill="#4CAF50" rx="2" />
                    <rect x="80" y="20" width="15" height="15" fill="#2A5CAA" rx="2" />
                    <rect x="100" y="30" width="15" height="15" fill="#FFD700" rx="2" />

                    {/* Círculos en los bloques (estilo LEGO) */}
                    <circle cx="27.5" cy="37.5" r="3" fill="#FFA500" />
                    <circle cx="47.5" cy="27.5" r="3" fill="#FF4444" />
                    <circle cx="67.5" cy="32.5" r="3" fill="#45A049" />
                    <circle cx="87.5" cy="27.5" r="3" fill="#1E3A8A" />
                    <circle cx="107.5" cy="37.5" r="3" fill="#FFA500" />

                    {/* Juguetería */}
                    <text
                      x="100"
                      y="65"
                      textAnchor="middle"
                      className="fill-blue-600 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
                    >
                      JUGUETERÍA
                    </text>

                    {/* Daniel */}
                    <text
                      x="100"
                      y="90"
                      textAnchor="middle"
                      className="fill-blue-700 font-bold"
                      style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}
                    >
                      DANIEL
                    </text>

                    {/* Juguetes adicionales */}
                    <circle cx="160" cy="50" r="8" fill="#FF6B6B" opacity="0.6" />
                    <rect x="170" y="70" width="10" height="10" fill="#4CAF50" opacity="0.6" rx="2" />
                  </svg>
                  {selectedLogo === 5 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>

              {/* Logo 6: Estilo Vintage */}
              <Card
                className={`cursor-pointer transition-all ${selectedLogo === 6 ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}`}
                onClick={() => setSelectedLogo(6)}
              >
                <CardHeader>
                  <CardTitle className="text-center">Opción 6: Vintage</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 bg-white">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="mb-4">
                    {/* Marco decorativo */}
                    <rect x="10" y="10" width="180" height="100" fill="none" stroke="#2A5CAA" strokeWidth="3" rx="10" />
                    <rect x="15" y="15" width="170" height="90" fill="none" stroke="#FFD700" strokeWidth="1" rx="8" />

                    {/* Corona ornamental */}
                    <path
                      d="M 80 25 L 85 15 L 90 22 L 95 15 L 100 22 L 105 15 L 110 22 L 115 15 L 120 25 Z"
                      fill="#FFD700"
                      stroke="#FFA500"
                      strokeWidth="1"
                    />

                    {/* Gemas en la corona */}
                    <ellipse cx="85" cy="20" rx="2" ry="3" fill="#FF6B6B" />
                    <ellipse cx="95" cy="20" rx="2" ry="3" fill="#4CAF50" />
                    <ellipse cx="105" cy="20" rx="2" ry="3" fill="#FF6B6B" />
                    <ellipse cx="115" cy="20" rx="2" ry="3" fill="#4CAF50" />

                    {/* Juguetería */}
                    <text
                      x="100"
                      y="50"
                      textAnchor="middle"
                      className="fill-blue-600 font-bold"
                      style={{ fontFamily: "serif", fontSize: "16px" }}
                    >
                      JUGUETERÍA
                    </text>

                    {/* Daniel con estilo serif */}
                    <text
                      x="100"
                      y="75"
                      textAnchor="middle"
                      className="fill-blue-700 font-bold"
                      style={{ fontFamily: "serif", fontSize: "22px" }}
                    >
                      DANIEL
                    </text>

                    {/* Decoraciones vintage */}
                    <path d="M 30 60 Q 35 55 40 60 Q 35 65 30 60" fill="#FFD700" opacity="0.5" />
                    <path d="M 160 60 Q 165 55 170 60 Q 165 65 160 60" fill="#FFD700" opacity="0.5" />

                    {/* Osito de peluche vintage */}
                    <circle cx="50" cy="85" r="6" fill="#D2691E" />
                    <circle cx="47" cy="82" r="2" fill="#D2691E" />
                    <circle cx="53" cy="82" r="2" fill="#D2691E" />
                    <circle cx="48" cy="84" r="0.5" fill="black" />
                    <circle cx="52" cy="84" r="0.5" fill="black" />
                  </svg>
                  {selectedLogo === 6 && <Badge className="bg-blue-600">Seleccionado</Badge>}
                </CardContent>
              </Card>
            </div>

            {/* Información del logo seleccionado */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-center">Detalles del Diseño Seleccionado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Características:</h3>
                    {selectedLogo === 1 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Corona integrada en la letra "D"</li>
                        <li>• Paleta: Azul brillante (#2A5CAA) y dorado (#FFD700)</li>
                        <li>• Elementos decorativos con juguetes</li>
                        <li>• Estilo moderno y llamativo</li>
                      </ul>
                    )}
                    {selectedLogo === 2 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Corona como punto de la "i" en Juguetería</li>
                        <li>• Diseño sutil pero distintivo</li>
                        <li>• Fácil de reproducir en diferentes tamaños</li>
                        <li>• Elementos decorativos equilibrados</li>
                      </ul>
                    )}
                    {selectedLogo === 3 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Formato horizontal ideal para letreros</li>
                        <li>• Corona prominente como elemento principal</li>
                        <li>• Juguetes decorativos alrededor</li>
                        <li>• Perfecto para fachadas y publicidad</li>
                      </ul>
                    )}
                    {selectedLogo === 4 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Diseño circular con texto curvo</li>
                        <li>• Corona y juguete central</li>
                        <li>• Ideal para sellos y aplicaciones redondas</li>
                        <li>• Elementos decorativos distribuidos</li>
                      </ul>
                    )}
                    {selectedLogo === 5 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Corona formada por bloques tipo LEGO</li>
                        <li>• Estilo moderno y juguetón</li>
                        <li>• Apela directamente a juguetes de construcción</li>
                        <li>• Colores vibrantes y alegres</li>
                      </ul>
                    )}
                    {selectedLogo === 6 && (
                      <ul className="space-y-2 text-sm">
                        <li>• Estilo vintage con marco ornamental</li>
                        <li>• Corona clásica con gemas</li>
                        <li>• Tipografía serif elegante</li>
                        <li>• Incluye osito de peluche vintage</li>
                      </ul>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Paleta de Colores:</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded mx-auto mb-1"></div>
                        <span className="text-xs">Azul Principal</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-400 rounded mx-auto mb-1"></div>
                        <span className="text-xs">Dorado</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-400 rounded mx-auto mb-1"></div>
                        <span className="text-xs">Rojo Acento</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-400 rounded mx-auto mb-1"></div>
                        <span className="text-xs">Verde Acento</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Códigos de Color:</h4>
                      <div className="text-sm space-y-1">
                        <div>• Azul: #2A5CAA</div>
                        <div>• Dorado: #FFD700</div>
                        <div>• Rojo: #FF6B6B</div>
                        <div>• Verde: #4CAF50</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">Descargar SVG</Button>
              <Button variant="outline">Ver en Diferentes Tamaños</Button>
              <Button variant="outline">Generar Variaciones</Button>
            </div>
          </div>
  
      {/* Modal de Checkout */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-800 mb-4">FINALIZAR COMPRA</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 font-medium">
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  value={checkoutForm.firstName}
                  onChange={(e) => setCheckoutForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  value={checkoutForm.lastName}
                  onChange={(e) => setCheckoutForm((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-700 font-medium">
                Localidad
              </Label>
              <Input
                id="location"
                value={checkoutForm.ci}
                onChange={(e) => setCheckoutForm((prev) => ({ ...prev, ci: e.target.value }))}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm((prev) => ({ ...prev, email: e.target.value }))}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp" className="text-gray-700 font-medium">
                Número de WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={checkoutForm.whatsapp}
                onChange={(e) => setCheckoutForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="deliveryMethod" className="text-gray-700 font-medium">
                Método de Entrega
              </Label>
              <Select
                value={checkoutForm.deliveryMethod}
                onValueChange={(value) => setCheckoutForm((prev) => ({ ...prev, deliveryMethod: value }))}
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Retirar del Local
                    </div>
                  </SelectItem>
                  <SelectItem value="delivery">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Recibir por Transporte
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="observations" className="text-gray-700 font-medium">
                Observaciones
              </Label>
              <Textarea
                id="observations"
                value={checkoutForm.observations}
                onChange={(e) => setCheckoutForm((prev) => ({ ...prev, observations: e.target.value }))}
                placeholder="Comentarios adicionales..."
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={handleSubmitOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              size="lg"
            >
              Enviar Pedido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-800">MiShop</span>
              </div>
              <p className="text-gray-600 text-sm">
                Tu tienda online de confianza con los mejores productos y precios.
              </p>
            </div>

            {/* Inicio */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Inicio</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Promociones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Ofertas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Novedades
                  </a>
                </li>
              </ul>
            </div>

            {/* Institucional */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Institucional</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Contacto</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>info@mishop.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Ciudad, País</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2024 MiShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
