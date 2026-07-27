export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          address_city: string
          address_complement: string | null
          address_district: string
          address_number: string
          address_postal_code: string
          address_state_abbr: string
          address_street: string
          created_at: string
          created_by: string | null
          customer_document: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          me_cart_id: string | null
          me_label_url: string | null
          me_order_id: string | null
          me_tracking: string | null
          notes: string | null
          product_name: string
          product_price: number
          product_quantity: number
          product_size: string | null
          shipping_company: string | null
          shipping_deadline: number | null
          shipping_price: number | null
          shipping_service_id: number | null
          shipping_service_name: string | null
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          address_city: string
          address_complement?: string | null
          address_district: string
          address_number: string
          address_postal_code: string
          address_state_abbr: string
          address_street: string
          created_at?: string
          created_by?: string | null
          customer_document: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          me_cart_id?: string | null
          me_label_url?: string | null
          me_order_id?: string | null
          me_tracking?: string | null
          notes?: string | null
          product_name: string
          product_price: number
          product_quantity?: number
          product_size?: string | null
          shipping_company?: string | null
          shipping_deadline?: number | null
          shipping_price?: number | null
          shipping_service_id?: number | null
          shipping_service_name?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          address_city?: string
          address_complement?: string | null
          address_district?: string
          address_number?: string
          address_postal_code?: string
          address_state_abbr?: string
          address_street?: string
          created_at?: string
          created_by?: string | null
          customer_document?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          me_cart_id?: string | null
          me_label_url?: string | null
          me_order_id?: string | null
          me_tracking?: string | null
          notes?: string | null
          product_name?: string
          product_price?: number
          product_quantity?: number
          product_size?: string | null
          shipping_company?: string | null
          shipping_deadline?: number | null
          shipping_price?: number | null
          shipping_service_id?: number | null
          shipping_service_name?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          author_name: string
          comment: string
          created_at: string
          id: string
          image_url: string | null
          product_slug: string
          rating: number
          updated_at: string
        }
        Insert: {
          author_name: string
          comment: string
          created_at?: string
          id?: string
          image_url?: string | null
          product_slug: string
          rating: number
          updated_at?: string
        }
        Update: {
          author_name?: string
          comment?: string
          created_at?: string
          id?: string
          image_url?: string | null
          product_slug?: string
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          audience: string
          category: string
          collection: string
          color: string
          created_at: string
          description: string
          id: string
          image: string
          inspiration: string
          is_active: boolean
          name: string
          price: string
          sizes: string
          slug: string
          sort_order: number
          tagline: string
          updated_at: string
        }
        Insert: {
          audience?: string
          category?: string
          collection?: string
          color?: string
          created_at?: string
          description?: string
          id?: string
          image?: string
          inspiration?: string
          is_active?: boolean
          name: string
          price?: string
          sizes?: string
          slug: string
          sort_order?: number
          tagline?: string
          updated_at?: string
        }
        Update: {
          audience?: string
          category?: string
          collection?: string
          color?: string
          created_at?: string
          description?: string
          id?: string
          image?: string
          inspiration?: string
          is_active?: boolean
          name?: string
          price?: string
          sizes?: string
          slug?: string
          sort_order?: number
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      studio_designs: {
        Row: {
          collection: string
          created_at: string
          id: string
          image: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          subtitle: string
          updated_at: string
        }
        Insert: {
          collection?: string
          created_at?: string
          id?: string
          image?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          subtitle?: string
          updated_at?: string
        }
        Update: {
          collection?: string
          created_at?: string
          id?: string
          image?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          subtitle?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_orders: {
        Row: {
          address_city: string | null
          address_complement: string | null
          address_district: string | null
          address_number: string | null
          address_postal_code: string | null
          address_state_abbr: string | null
          address_street: string | null
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          id: string
          message: string | null
          product_color: string | null
          product_name: string
          product_price: string | null
          product_price_pix: string | null
          product_size: string | null
          product_slug: string | null
          shipping_deadline: string | null
          shipping_price: string | null
          shipping_service: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address_city?: string | null
          address_complement?: string | null
          address_district?: string | null
          address_number?: string | null
          address_postal_code?: string | null
          address_state_abbr?: string | null
          address_street?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          message?: string | null
          product_color?: string | null
          product_name: string
          product_price?: string | null
          product_price_pix?: string | null
          product_size?: string | null
          product_slug?: string | null
          shipping_deadline?: string | null
          shipping_price?: string | null
          shipping_service?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address_city?: string | null
          address_complement?: string | null
          address_district?: string | null
          address_number?: string | null
          address_postal_code?: string | null
          address_state_abbr?: string | null
          address_street?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          message?: string | null
          product_color?: string | null
          product_name?: string
          product_price?: string | null
          product_price_pix?: string | null
          product_size?: string | null
          product_slug?: string | null
          shipping_deadline?: string | null
          shipping_price?: string | null
          shipping_service?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      order_status:
        | "novo"
        | "carrinho"
        | "pago"
        | "gerado"
        | "impresso"
        | "enviado"
        | "entregue"
        | "cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: [
        "novo",
        "carrinho",
        "pago",
        "gerado",
        "impresso",
        "enviado",
        "entregue",
        "cancelado",
      ],
    },
  },
} as const
