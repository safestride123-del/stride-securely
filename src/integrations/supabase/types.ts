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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      career_resources: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          details: string | null
          eligibility: string | null
          icon: string | null
          id: string
          link: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          details?: string | null
          eligibility?: string | null
          icon?: string | null
          id?: string
          link?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          details?: string | null
          eligibility?: string | null
          icon?: string | null
          id?: string
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      danger_reports: {
        Row: {
          created_at: string | null
          danger_type: string
          description: string | null
          id: string
          is_anonymous: boolean | null
          location: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          danger_type: string
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          location: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          danger_type?: string
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          location?: string
          user_id?: string | null
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone: string
          relation: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone: string
          relation?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          relation?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          blood_group: string | null
          created_at: string | null
          dark_mode: boolean | null
          date_of_birth: string | null
          full_name: string | null
          gender: string | null
          id: string
          location_enabled: boolean | null
          notification_enabled: boolean | null
          phone: string | null
          sos_custom_message: string | null
          updated_at: string | null
          voice_recording_enabled: boolean | null
        }
        Insert: {
          blood_group?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          location_enabled?: boolean | null
          notification_enabled?: boolean | null
          phone?: string | null
          sos_custom_message?: string | null
          updated_at?: string | null
          voice_recording_enabled?: boolean | null
        }
        Update: {
          blood_group?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          location_enabled?: boolean | null
          notification_enabled?: boolean | null
          phone?: string | null
          sos_custom_message?: string | null
          updated_at?: string | null
          voice_recording_enabled?: boolean | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          badges: string[] | null
          completed_lessons: string[] | null
          created_at: string | null
          id: string
          last_activity: string | null
          quiz_scores: Json | null
          streak: number | null
          updated_at: string | null
          user_id: string
          xp: number | null
        }
        Insert: {
          badges?: string[] | null
          completed_lessons?: string[] | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          quiz_scores?: Json | null
          streak?: number | null
          updated_at?: string | null
          user_id: string
          xp?: number | null
        }
        Update: {
          badges?: string[] | null
          completed_lessons?: string[] | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          quiz_scores?: Json | null
          streak?: number | null
          updated_at?: string | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
