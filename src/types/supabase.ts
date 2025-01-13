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
      comments: {
        Row: {
          content: string
          created_at: string | null
          drink_id: string
          id: string
          nickname: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          drink_id: string
          id?: string
          nickname?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          drink_id?: string
          id?: string
          nickname?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      drinks: {
        Row: {
          acidity: number | null
          alcohol_content: number | null
          body: number | null
          carbonation: number | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          ingredients: string | null
          manufacturer: string | null
          name: string
          sweetness: number | null
          type: string
          volume: string | null
        }
        Insert: {
          acidity?: number | null
          alcohol_content?: number | null
          body?: number | null
          carbonation?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          ingredients?: string | null
          manufacturer?: string | null
          name: string
          sweetness?: number | null
          type: string
          volume?: string | null
        }
        Update: {
          acidity?: number | null
          alcohol_content?: number | null
          body?: number | null
          carbonation?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          ingredients?: string | null
          manufacturer?: string | null
          name?: string
          sweetness?: number | null
          type?: string
          volume?: string | null
        }
        Relationships: []
      }
      food_pairings: {
        Row: {
          created_at: string | null
          drink_id: string
          food_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          drink_id: string
          food_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          drink_id?: string
          food_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_pairings_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_pairings_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
        ]
      }
      foods: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          drink_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          drink_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          drink_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          id: string
          image: string | null
          name: string
          place_id: string
        }
        Insert: {
          id: string
          image?: string | null
          name: string
          place_id?: string
        }
        Update: {
          id?: string
          image?: string | null
          name?: string
          place_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menus_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string
          id: string
          image: string | null
          keywords: string | null
          location_x: number
          location_y: number
          name: string
          opening_hours: string | null
          phone_number: string | null
          score: number | null
          user_score: string | null
        }
        Insert: {
          address: string
          id?: string
          image?: string | null
          keywords?: string | null
          location_x: number
          location_y: number
          name: string
          opening_hours?: string | null
          phone_number?: string | null
          score?: number | null
          user_score?: string | null
        }
        Update: {
          address?: string
          id?: string
          image?: string | null
          keywords?: string | null
          location_x?: number
          location_y?: number
          name?: string
          opening_hours?: string | null
          phone_number?: string | null
          score?: number | null
          user_score?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comment_id: string | null
          created_at: string | null
          drink_id: string
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          drink_id: string
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          drink_id?: string
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_comment_id"
            columns: ["comment_id"]
            isOneToOne: true
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reco_results: {
        Row: {
          drink_id: string
          id: string
          image: string | null
          name: string
          reason: string | null
          type: string
          user_id: string
        }
        Insert: {
          drink_id: string
          id?: string
          image?: string | null
          name: string
          reason?: string | null
          type: string
          user_id: string
        }
        Update: {
          drink_id?: string
          id?: string
          image?: string | null
          name?: string
          reason?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reco_results_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reco_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      survey: {
        Row: {
          acidity: string
          body: string
          carbonation: string
          food: string
          id: string
          level: string
          sweetness: string
          type: string
          user_id: string
        }
        Insert: {
          acidity: string
          body: string
          carbonation: string
          food: string
          id?: string
          level: string
          sweetness: string
          type: string
          user_id: string
        }
        Update: {
          acidity?: string
          body?: string
          carbonation?: string
          food?: string
          id?: string
          level?: string
          sweetness?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          agree_terms: boolean
          created_at: string | null
          id: string
          nickname: string
          profile_image: string | null
        }
        Insert: {
          agree_terms: boolean
          created_at?: string | null
          id: string
          nickname: string
          profile_image?: string | null
        }
        Update: {
          agree_terms?: boolean
          created_at?: string | null
          id?: string
          nickname?: string
          profile_image?: string | null
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
