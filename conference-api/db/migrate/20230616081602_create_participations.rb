class CreateParticipations < ActiveRecord::Migration[7.0]
  def change
    create_table :participations do |t|
      t.integer :participant_id
      t.integer :conference_id

      t.timestamps
    end
  end
end
