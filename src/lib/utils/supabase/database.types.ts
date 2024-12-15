export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          approle: Database["public"]["Enums"]["app_role"]
          created_at: string
          email_address: string
          fullname: string | null
          id: string
          whatsapp: string | null
        }
        Insert: {
          approle?: Database["public"]["Enums"]["app_role"]
          created_at?: string
          email_address: string
          fullname?: string | null
          id: string
          whatsapp?: string | null
        }
        Update: {
          approle?: Database["public"]["Enums"]["app_role"]
          created_at?: string
          email_address?: string
          fullname?: string | null
          id?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      voucher_claims: {
        Row: {
          claimed_at: string
          id: string
          is_redeemed: boolean
          redeemed_at: string | null
          user_id: string
          voucher_code: string
          voucher_id: string
        }
        Insert: {
          claimed_at?: string
          id?: string
          is_redeemed?: boolean
          redeemed_at?: string | null
          user_id: string
          voucher_code?: string
          voucher_id: string
        }
        Update: {
          claimed_at?: string
          id?: string
          is_redeemed?: boolean
          redeemed_at?: string | null
          user_id?: string
          voucher_code?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_claims_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          created_at: string
          description: string
          end_date: string
          id: string
          image_url: string | null
          max_claim: number
          prefix: string
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          id?: string
          image_url?: string | null
          max_claim?: number
          prefix?: string
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          image_url?: string | null
          max_claim?: number
          prefix?: string
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      profile_email_addresses: {
        Row: {
          email_address: string | null
        }
        Insert: {
          email_address?: string | null
        }
        Update: {
          email_address?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_email_exists: {
        Args: {
          email: string
        }
        Returns: boolean
      }
      generate_voucher_claims: {
        Args: {
          p_user_id: string
          p_voucher_id: string
          p_count: number
        }
        Returns: undefined
      }
      redeem_voucher: {
        Args: {
          p_voucher_id?: string
          p_voucher_code?: string
          p_user_id?: string
        }
        Returns: undefined
      }
      redeem_voucher_by_code: {
        Args: {
          p_voucher_code: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "customer" | "crew" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
